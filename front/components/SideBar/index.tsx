import ChannelList from '@components/ChannelList';
import CreateRoomModal from '@components/CreateRoomModal';
import MemberList from '@components/MemberList';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { ContentTabs, ContentWrapper, CreateRoomBox, CreateRoomBtn, Tab, Wrapper } from './styles';

interface SidebarProps {
  show: boolean;
}

const SideBar = ({ show }: SidebarProps) => {
  // console.log(isMobile);
  const { data: showModalState, mutate: showModalMutate } = useSWR('showModalState');

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
              {/* <h2>방 목록</h2> */}
              <article>
                <ChannelList />
              </article>
              <CreateRoomBox>
                {/* {showModalState?.create_room && (
                  <ModalWrapper>
                    <CreateRoomModal />
                  </ModalWrapper>
                )} */}
                <CreateRoomBtn onClick={onClickCreateRoomBtn}>
                  <div className="btn_content">
                    <div className="btn_icon">
                      <p className="btn_text">방 생성하기</p>
                    </div>
                  </div>
                </CreateRoomBtn>
              </CreateRoomBox>
            </div>
          </Tab>
          <Tab>
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label htmlFor="tab-2">친구목록</label>
            <div className="tab_content">
              {/* <h2>현재 방에 있는 사람 목록</h2> */}
              <article>
                <MemberList />
              </article>
              {/* <div className='tab_content'>
                <CreateRoomBtn onClick={onClickCreateRoomBtn}>
                  <div className="btn_content">
                    <div className="btn_icon">
                      <p className="btn_text">방 생성하기</p>
                    </div>
                  </div>
                </CreateRoomBtn>
              </div> */}
            </div>
          </Tab>
        </ContentTabs>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SideBar;
