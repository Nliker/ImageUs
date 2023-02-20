import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import { Button } from '@styles/Button';
import { DRoomData } from '@typing/db';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  ContentWrappper,
  MainIntroduction,
  MainRoomList,
  Wrappper,
} from './styles';

const MainPage = () => {
  const userId = sessionStorage.getItem('USER_ID');
  const { data: logInInfo } = useSWR('/user/my');
  const {
    data: roomlist,
    mutate: mutateRoomlist,
    isLoading: roomlistIsLoading,
  } = useSWR(`/user/${userId}/roomlist`, getUserRoomListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
  });

  useEffect(() => {
    console.log('확인', logInInfo);
    if (!logInInfo.logInState) return;
    mutateRoomlist();
  }, [logInInfo]);

  console.log('메인페이지 로그인:', logInInfo);

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
                  <Scrollbars>
                    <ul className="room_list">
                      {!roomlist ? (
                        <div>로딩중...</div>
                      ) : roomlist.length === 0 ? (
                        <div>등록된 방이 없습니다.</div>
                      ) : (
                        roomlist?.map((roomData: DRoomData) => (
                          <Link key={roomData.id} to={`/booth/${roomData.id}`}>
                            <li>{roomData.title}</li>
                          </Link>
                        ))
                      )}
                    </ul>
                  </Scrollbars>
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
