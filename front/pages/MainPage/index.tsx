import React, { CSSProperties, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import { Link } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import { NavLink } from 'react-router-dom';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import { Button } from '@styles/Button';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import {
  ContentWrappper,
  MainIntroduction,
  MainRoomList,
  Wrappper,
} from './styles';
import ActionButton from '@styles/ActiveButton';

const MainPage = () => {
  const userId = sessionStorage.getItem('user_id');
  const { data: logInInfo } = useSWR('/user/my');
  const { data: roomlist, mutate: mutateRoomlist } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
    },
  );

  const createBtnStyle: CSSProperties = {
    width: '150px',
  };

  useEffect(() => {
    if (!logInInfo.logInState) return;
    mutateRoomlist();
  }, [logInInfo]);

  return (
    <AppLayout>
      <Wrappper>
        <ContentWrappper>
          <main>
            {!logInInfo.logInState ? (
              <Scrollbars>
                <MainIntroduction>
                  <div className="main_background">
                    <article className="main_page_article">
                      <h1 className="main_page_intro">
                        지인들과의 사진을 <br />
                        <span className="brand_logo">ImageUS</span>와
                        <br /> 공유하고 간직하세요!
                      </h1>
                    </article>
                    <div className="btn_group">
                      <NavLink to={'/login'}>
                        <Button>로그인 하기</Button>
                      </NavLink>
                      <NavLink to={'/signup'}>
                        <Button>회원가입 하기</Button>
                      </NavLink>
                    </div>
                    <img
                      src="/styles/image/main_background_img.png"
                      alt="사진기 이미지"
                    />
                  </div>
                </MainIntroduction>
              </Scrollbars>
            ) : (
              <MainRoomList>
                <header>
                  <h1>방에 입장하기</h1>
                </header>
                <div className="content_box">
                  <div className="content_list">
                    <Scrollbars>
                      <ul className="room_list">
                        {!roomlist ? (
                          <div>로딩중...</div>
                        ) : roomlist.length === 0 ? (
                          <div>등록된 방이 없습니다.</div>
                        ) : (
                          roomlist?.map((roomData: DRoomData) => (
                            <Link
                              key={roomData.id}
                              to={`/booth/${roomData.id}`}
                            >
                              <li>{roomData.title}</li>
                            </Link>
                          ))
                        )}
                      </ul>
                    </Scrollbars>
                  </div>
                  <div className="create_room_btn">
                    <ActionButton
                      onClickBtn={() => {
                        mutate('modalState', {
                          currentModalState: 'creatRoom',
                        });
                      }}
                      btnTitle={'방 생성하기'}
                      customStyle={createBtnStyle}
                    />
                  </div>
                </div>
              </MainRoomList>
            )}
          </main>
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
