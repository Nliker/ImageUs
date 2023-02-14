import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import { DRoomData } from '@typing/db';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate, useParams } from 'react-router';
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
  const { data: roomlist, isValidating: roomListValidating } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  console.log('메인페이지 로그인:', logInInfo);

  return (
    <AppLayout>
      <Wrappper>
        <ContentWrappper>
          <main>
            {!logInInfo.logInState ? (
              <MainIntroduction>
                <header>
                  <h1>
                    지인들과의 사진을{' '}
                    <span className="brand_logo">ImageUS</span>와
                    <br /> 공유하고 간직하세요!
                  </h1>
                </header>
              </MainIntroduction>
            ) : (
              <MainRoomList>
                <header>
                  <h1>방에 입장하기</h1>
                </header>
                <div className="content_box">
                  <Scrollbars>
                    <ul className="room_list">
                      {!roomListValidating &&
                        roomlist?.map((roomData: DRoomData) => (
                          <Link key={roomData.id} to={`/booth/${roomData.id}`}>
                            <li>{roomData.title}</li>
                          </Link>
                        ))}
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
