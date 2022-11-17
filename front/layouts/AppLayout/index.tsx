import React, { useCallback, useState } from 'react';
import NavBar from '@components/NavBar';
import ToolBar from '@components/ToolBar';
import RoomList from '@components/SideBar';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [showRoomList, setShowRoomList] = useState<boolean>(false);
  const handleRoomListBtn = useCallback(() => {
    console.log(showRoomList);
    setShowRoomList(prev => !prev);
  }, [showRoomList]);

  return (
    <div>
      <NavBar />
      <ToolBar handleRoomListBtn={handleRoomListBtn}/>
      {showRoomList && <RoomList />}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
