import React, { CSSProperties, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { NavLink } from 'react-router-dom';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import { Button } from '@styles/Button';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import { BackgroundImg } from '@assets/image';
import {
  ContentWrappper,
  MainIntroduction,
  MainRoomList,
  Wrappper,
} from './styles';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';

const MainPage = () => {
  const userId = sessionStorage.getItem('user_id');
  const { mutate } = useSWRConfig();
  const {
    data: userInfo,
    mutate: mutateUserState,
    isValidating,
  } = useSWR('/user/my');

  const createBtnStyle: CSSProperties = {
    width: '150px',
  };

  useEffect(() => {
    if (userInfo?.logInState === 'LoggingOut') {
      mutateUserState({ logInState: 'LoggedOut' });
    }
    return;
  }, [userInfo]);

  const IsNotLoginMainPage = () => {
    return (
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
            <BackgroundImg />
          </div>
        </MainIntroduction>
      </Scrollbars>
    );
  };

  const IsLoginMainPage = () => {
    const { data: roomlist, mutate: mutateRoomlist } = useSWR(
      `/user/${userId}/roomlist`,
    );

    useEffect(() => {
      if (!userInfo || userInfo.logInState === 'LoggedOut') return;
      mutateRoomlist(getUserRoomListFetcher(`/user/${userId}/roomlist`));
    }, []);

    return (
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
                  roomlist.map((roomData: DRoomData) => (
                    <Link key={roomData.id} to={`/room/${roomData.id}`}>
                      <li>{roomData.title}</li>
                    </Link>
                  ))
                )}
              </ul>
            </Scrollbars>
          </div>
          <div className="create_room_btn">
            <ActionButton
              onClickBtn={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();

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
    );
  };

  if (!userInfo || userInfo.logInState === 'LoggingOut' || isValidating) {
    return <Spinner />;
  }

  return (
    <AppLayout>
      <Wrappper>
        <ContentWrappper>
          <main>
            {userInfo?.logInState === 'LoggedOut' ? (
              <IsNotLoginMainPage />
            ) : (
              <IsLoginMainPage />
            )}
          </main>
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
