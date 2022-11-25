import ChannelList from '@components/ChannelList';
import MemberList from '@components/MemberList';
import React from 'react';
import { ChannelListBox, ContentWrapper, Wrapper } from './styles';

interface SidebarProps {
  show: boolean;
}

const SideBar = ({ show }: SidebarProps) => {
  // console.log(isMobile);
  return (
    <Wrapper show={show}>
      {/* <MemberList /> */}
      {/* <div>
        <h1>방 이름</h1>
      </div> */}
      <ContentWrapper>
        <ChannelListBox>
          {/* <h2>방 목록</h2> */}
          <ChannelList />
        </ChannelListBox>
        <div>
          {/* <h2>현재 방에 있는 사람 목록</h2> */}
          <MemberList />
        </div>
        {/* <div>
          <span>+</span>
        </div> */}
      </ContentWrapper>
    </Wrapper>
  );
};

export default SideBar;
