import React from 'react';
import { ContentWrapper, RoomItem, Wrapper } from './styles';

const RoomList = () => {
  return (
    <Wrapper>
      {/* <MemberList /> */}
      <ContentWrapper>
        <RoomItem></RoomItem>
        {/* <div>
          <span>+</span>
        </div> */}
      </ContentWrapper>
    </Wrapper>
  );
};

export default RoomList;
