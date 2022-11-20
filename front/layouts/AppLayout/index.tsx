import React, { useCallback, useState } from 'react';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { ContentWrapper } from './styles';
import TopNavBar from '@components/TopNavBar';
import BottomNavBar from '@components/BottomNavBar';
import { useMediaQuery } from 'react-responsive';
import UploadModal from '@components/UploadModal';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const [showUploadModal, setshowUploadModal] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleRoomListBtn = useCallback(() => {
    // console.log(showSideBar);
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  const showModal = useCallback(() => setshowUploadModal(true), [showUploadModal]);

  const onCloseModal = useCallback(() => setshowUploadModal(false), []);

  return (
    <div>
      <TopNavBar />
      {isMobile && <BottomNavBar showModal={showModal} />}
      <ToolBar handleRoomListBtn={handleRoomListBtn} />
      <SideBar show={showSideBar} isMobile={isMobile} />
      {/* {showSideBar && <SideBar />} */}
      <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      {showUploadModal && <UploadModal onCloseModal={onCloseModal} />}
    </div>
  );
};

export default AppLayout;
