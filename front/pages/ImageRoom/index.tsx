import ContentSection from '@components/ContentSection';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const toggleSidebar = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  const closeSidebar = useCallback(() => {
    setshowSideBar(false);
  }, [showSideBar]);

  return (
    <AppLayout>
      <ToolBar handleSidebar={toggleSidebar} />
      <SideBar show={showSideBar} roomId={roomId} close={closeSidebar} />
      <ContentSection roomId={roomId} />
    </AppLayout>
  );
};

export default ImageRoom;
