import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import logInFetcher from '@utils/logInFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { ContentWrappper, MainIntroduction, Wrappper } from './styles';

interface MainPageProps {
  isLogIn?: boolean;
}

const MainPage = ({ isLogIn }: MainPageProps) => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const [showSideBar, setshowSideBar] = useState<boolean>(false);

  const handleRoomListBtn = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  console.log(roomId, '메인페이지');

  return (
    <AppLayout roomId={roomId}>
      <ToolBar handleRoomListBtn={handleRoomListBtn} isLogIn={isLogIn} />
      {/* {roomId && <SideBar show={showSideBar} roomId={roomId} />} */}
      <Wrappper>
        <ContentWrappper>
          <main>
            <MainIntroduction>
              <header>
                <h1>
                  지인들과의 사진을 <span className="brand_logo">ImageUS</span>와
                  <br /> 공유하고 간직하세요!
                </h1>
              </header>
            </MainIntroduction>
          </main>
          {/* {roomId ? (
            <ContentSection roomId={roomId} />
          ) : (
          )} */}
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
