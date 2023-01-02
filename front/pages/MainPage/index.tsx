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
import useSWR, { mutate } from 'swr';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const [showSideBar, setshowSideBar] = useState<boolean>(false);

  // useEffect(() => {
  //   // if (!roomId) return;
  //   console.log('메인페이지', roomId);
  //   mutate('roomId', roomId, true);
  // }, [roomId]);

  const handleRoomListBtn = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  console.log(roomId, '메인페이지');
  // const location = useLocation();
  // useEffect(() => {
  //   console.log(location);
  // }, [ location ])

  return (
    <AppLayout roomId={roomId}>
      <ToolBar handleRoomListBtn={handleRoomListBtn} />
      <SideBar show={showSideBar} roomId={roomId} />
      <Wrappper>
        <ContentWrappper>
          <ContentSection roomId={roomId} />
          {/* <Routes>
            <Route index element={<ContentSection />} />
            <Route path=":roomId" element={<ContentSection />} />
          </Routes> */}
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
