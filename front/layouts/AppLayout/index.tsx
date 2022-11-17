import React, { useCallback, useState } from 'react';
import NavBar from '@components/NavBar';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { ContentWrapper } from './styles';

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
      <NavBar />
      <ToolBar handleRoomListBtn={handleRoomListBtn} />
      <SideBar show={showSideBar} />
      {/* {showSideBar && <SideBar />} */}
      <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
