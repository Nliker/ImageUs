import ChannelList from '@components/ChannelList';
import MemberList from '@components/MemberList';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import { ChannelListBox, ContentWrapper, CreateRoomBtn, Wrapper } from './styles';

interface SidebarProps {
  show: boolean;
}

const SideBar = ({ show }: SidebarProps) => {
  // console.log(isMobile);
  const { data: showModalData, mutate: showModalMutate } = useSWR('showModalState');

  const onClickCreateRoomBtn = useCallback(() => {
    showModalMutate({
      ...showModalData,
      create_room: true,
    });
  }, [showModalData]);
  console.log(showModalData);

  return (
    <Wrapper show={show}>
      <ContentWrapper>
        <ChannelListBox>
          {/* <h2>방 목록</h2> */}
          <ChannelList />
        </ChannelListBox>
        <div>
          {/* <h2>현재 방에 있는 사람 목록</h2> */}
          <MemberList />
        </div>
        <div>
          <CreateRoomBtn onClick={onClickCreateRoomBtn}>
            <div className="btn_content">
              <div className="btn_icon">
                <p className="btn_text">방 생성하기</p>
              </div>
            </div>
          </CreateRoomBtn>
        </div>
        {/* <div>
          <span>+</span>
        </div> */}
      </ContentWrapper>
    </Wrapper>
  );
};

export default SideBar;
