import ChannelList from '@components/ChannelList';
import CreateRoomModal from '@components/CreateRoomModal';
import MemberList from '@components/MemberList';
import React, {
  memo,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { Route, Routes } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
import ActionButton from './ActionButton';
import {
  Background,
  ContentTabs,
  ContentWrapper,
  CreateBtnBox,
  Tab,
  Wrapper,
} from './styles';

interface SidebarProps {
  show: boolean;
  close: () => void;
}

const SideBar = memo(({ show, close }: SidebarProps) => {
  const { data: showModalState, mutate: showModalMutate } =
    useSWR('showModalState');
  const { roomId } = useParams<{ roomId: string }>();
  const sideBarEl = useRef<HTMLDivElement>(null);
  const backgroundEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(backgroundEl);
    backgroundEl.current?.addEventListener('click', handleCloseSidebar);
    return () => {
      backgroundEl.current?.removeEventListener('click', handleCloseSidebar);
    };
  }, [backgroundEl.current, show]);

  const handleCloseSidebar = useCallback(
    (e: MouseEvent) => {
      console.log('클로즈', backgroundEl);
      if (
        e.target instanceof HTMLElement &&
        !sideBarEl.current?.contains(e.target)
      ) {
        close();
      }
    },
    [show],
  );

  const onClickCreateRoomBtn = useCallback(() => {
    showModalMutate({
      ...showModalState,
      create_room: true,
    });
  }, [showModalState]);

  const onClickInviteMember = useCallback(() => {
    showModalMutate({
      ...showModalState,
      invite_member: true,
    });
  }, [showModalState]);

  return (
    <>
      {show && <Background ref={backgroundEl} />}
      <Wrapper show={show} ref={sideBarEl}>
        <ContentWrapper>
          <ContentTabs>
            <Tab>
              <input
                type="radio"
                id="tab-1"
                name="tab-group-1"
                defaultChecked
              />
              <label htmlFor="tab-1">방 목록</label>
              <div className="tab_content">
                <div className="tab_content_box">
                  <CreateBtnBox>
                    <ActionButton
                      onClickBtn={onClickCreateRoomBtn}
                      btnTitle={'생성하기'}
                    />
                  </CreateBtnBox>
                  <ChannelList closeSidebar={close} />
                </div>
              </div>
            </Tab>
            <Tab>
              <input type="radio" id="tab-2" name="tab-group-1" />
              <label htmlFor="tab-2">멤버목록</label>
              <div className="tab_content">
                <div className="tab_content_box">
                  <CreateBtnBox>
                    <ActionButton
                      onClickBtn={onClickInviteMember}
                      btnTitle={'초대하기'}
                    />
                  </CreateBtnBox>
                  <MemberList roomId={roomId} />
                </div>
              </div>
            </Tab>
          </ContentTabs>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

export default SideBar;
