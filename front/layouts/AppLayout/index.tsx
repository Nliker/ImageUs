import React, { useCallback, useState } from 'react';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { ContentWrapper } from './styles';
import TopNavBar from '@components/TopNavBar';
import BottomNavBar from '@components/BottomNavBar';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const handleRoomListBtn = useCallback(() => {
    console.log(showSideBar);
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  return (
    <div>
      <TopNavBar />
      <BottomNavBar />
      <ToolBar handleRoomListBtn={handleRoomListBtn} />
      <SideBar show={showSideBar} />
      {/* {showSideBar && <SideBar />} */}
      <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
