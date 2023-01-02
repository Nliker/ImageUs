import ChannelList from '@components/ChannelList';
import CreateRoomModal from '@components/CreateRoomModal';
import MemberList from '@components/MemberList';
import React, { memo, useCallback, useState } from 'react';
import { Route, Routes } from 'react-router';
import useSWR from 'swr';
import ActionButton from './ActionButton';
import { ContentTabs, ContentWrapper, CreateBtn, CreateBtnBox, Tab, Wrapper } from './styles';

interface SidebarProps {
  show: boolean;
}

const SideBar = memo(({ show }: SidebarProps) => {
  // console.log(isMobile);
  const { data: showModalState, mutate: showModalMutate } = useSWR('showModalState');
  const { data: roomId } = useSWR('roomId');
  // const [switchTab, setSwitchTab] = useState<boolean>(true);

  // const onChangeTab = useCallback(() => {
  //   setSwitchTab(prev => !prev);
  // }, [])

  const onClickCreateRoomBtn = useCallback(() => {
    showModalMutate({
      ...showModalState,
      create_room: true,
    });
  }, [showModalState]);
  // console.log(showModalState);

  const onClickInviteMember = useCallback(() => {
    showModalMutate({
      ...showModalState,
      invite_member: true,
    });
  }, []);
  
  return (
    <Wrapper show={show}>
      <ContentWrapper>
        <ContentTabs>
          {/* 라디오 그룹을 name 이름이 동일하게 그룹으로 묶고 
          id로 구분해준다. 그러면 하나의 그룹 안에서 한가지만 선택할 수 있게 된다. */}
          <Tab>
            <input type="radio" id="tab-1" name="tab-group-1" defaultChecked />
            <label htmlFor="tab-1">방 목록</label>
            <div className="tab_content">
              <div className="tab_content_box">
                <CreateBtnBox>
                  <ActionButton onClickBtn={onClickCreateRoomBtn} btnTitle={'생성하기'} />
                </CreateBtnBox>
                <ChannelList />
              </div>
            </div>
          </Tab>
          {roomId && <Tab>
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label htmlFor="tab-2">멤버목록</label>
            <div className="tab_content">
              <div className="tab_content_box">
                <CreateBtnBox>
                  <ActionButton onClickBtn={onClickInviteMember} btnTitle={'초대하기'} />
                </CreateBtnBox>
                <MemberList />
              </div>
            </div>
          </Tab>}
        </ContentTabs>
      </ContentWrapper>
    </Wrapper>
  );
});

export default SideBar;
