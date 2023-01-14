import ContentSection from '@components/ContentSection';
import SideBar from '@components/SideBar';
import ToolBar from '@components/ToolBar';
import AppLayout from '@layouts/AppLayout';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const scrollbarRef = useRef<Scrollbars>(null);

  const toggleSidebar = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  const closeSidebar = useCallback(() => {
    setshowSideBar(false);
  }, [showSideBar]);

  console.log('룸 룸아이디:', roomId);

  return (
    <AppLayout>
      <ToolBar handleSidebar={toggleSidebar} />
      <SideBar show={showSideBar} roomId={roomId} close={closeSidebar} />
      {/* 키를 줌으로서 룸아이디에 따라서 컴포넌트를 unmount 시키고 remount 시킬 수 있다. */}
      <ContentSection key={roomId} roomId={roomId} ref={scrollbarRef} />
    </AppLayout>
  );
};

export default ImageRoom;
