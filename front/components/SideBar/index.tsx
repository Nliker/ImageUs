import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router';

import Scrollbars from 'react-custom-scrollbars';

import ChannelList from '@components/ChannelList';
import MemberList from '@components/MemberList';
import { DRoomData } from '@typing/db';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import {
  Background,
  ContentTabs,
  ContentWrapper,
  Tab,
  Wrapper,
} from './styles';

interface SidebarProps {
  show: boolean;
  close: () => void;
}

const SideBar = memo(({ show, close }: SidebarProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = sessionStorage.getItem('user_id');

  const { data: roomListInfo } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const sideBarEl = useRef<HTMLDivElement>(null);
  const backgroundEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backgroundEl.current?.addEventListener('click', handleCloseSidebar);
    return () => {
      backgroundEl.current?.removeEventListener('click', handleCloseSidebar);
    };
  }, [backgroundEl.current, show]);

  const handleCloseSidebar = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !sideBarEl.current?.contains(e.target)
      ) {
        close();
      }
    },
    [show],
  );

  const extractRoomList = useMemo(() => {
    if (!roomListInfo) return;

    const roomListData = roomListInfo.map((data: DRoomData) => {
      return {
        id: data.id,
        data: data.title,
      };
    });

    return [...roomListData];
  }, [roomListInfo]);

  const extractCurrentUserList = useMemo(() => {
    if (!roomListInfo) return;

    const currentRoomData = roomListInfo.find(
      (data: DRoomData) => '' + data.id === roomId,
    );
    return { ...currentRoomData };
  }, [roomId, roomListInfo]);

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
              <label className="tab_label" htmlFor="tab-1">
                방 목록
              </label>
              <div className="tab_content">
                <Scrollbars>
                  <div className="tab_content_box">
                    <ChannelList
                      roomlist={extractRoomList}
                      closeSidebar={close}
                    />
                  </div>
                </Scrollbars>
              </div>
            </Tab>
            <Tab>
              <input type="radio" id="tab-2" name="tab-group-1" />
              <label className="tab_label" htmlFor="tab-2">
                멤버목록
              </label>
              <div className="tab_content">
                <Scrollbars>
                  <div className="tab_content_box">
                    <MemberList currentRoomInfo={extractCurrentUserList} />
                  </div>
                </Scrollbars>
              </div>
            </Tab>
          </ContentTabs>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

export default SideBar;
