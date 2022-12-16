import ContentImageModal from '@components/ContentImageModal';
import ContentSection from '@components/ContentSection';
import CreateRoomModal from '@components/CreateRoomModal';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import logInFetcher from '@utils/logInFetcher';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate } from 'react-router';
import useSWR from 'swr';
import { ContentWrappper, Wrappper } from './styles';

const MainPage = () => {
  const [showSideBar, setshowSideBar] = useState<boolean>(false);

  const handleRoomListBtn = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  // const location = useLocation();
  // useEffect(() => {
  //   console.log(location);
  // }, [ location ])
  
  return (
    <AppLayout>
      <ToolBar handleRoomListBtn={handleRoomListBtn} />
      <SideBar show={showSideBar} />
      <Wrappper>
        <ContentWrappper>
          <Routes>
            <Route index element={<ContentSection />} />
            <Route path=":roomId" element={<ContentSection />} />
          </Routes>
        </ContentWrappper>
      </Wrappper>
    </AppLayout>
  );
};

export default MainPage;
