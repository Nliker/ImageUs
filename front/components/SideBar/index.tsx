import ChannelList from '@components/ChannelList';
import MemberList from '@components/MemberList';
import React from 'react';
import { ContentWrapper, RoomItem, Wrapper } from './styles';

// 현재 구상 중인 것은 모바일 버전일 경우 토글 버튼으로 왼쪽에서 나오고
// PC버전일 경우 왼쪽부분에 그대로 붙어있는 모양이다.

const SideBar = () => {
  
  return (
    <Wrapper>
      {/* <MemberList /> */}
      <div>
        <h1>방 이름</h1>
      </div>
      <ContentWrapper>
        <div>
          <h2>방 목록</h2>
          <ChannelList />
        </div>
        <div>
          <h2>현재 방에 있는 사람 목록</h2>
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
