import ContentSection from '@components/ContentSection';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const handleSidebar = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  console.log(roomId);

  return (
    <AppLayout>
      <ToolBar handleSidebar={handleSidebar} />
      <SideBar show={showSideBar} />
      <ContentSection roomId={roomId} />
    </AppLayout>
  );
};

export default ImageRoom;
