import React, { useCallback, useState } from 'react';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { Container, ContentWrapper, Wrapper } from './styles';
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
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  const showModal = useCallback(() => {
    setshowUploadModal(true);
  }, [showUploadModal]);

  const onCloseModal = useCallback(() => {
    setshowUploadModal(false);
  }, []);

  return (
    <Wrapper>
      <Container showModal={showUploadModal}>
        <TopNavBar />
        {/* {isMobile && <BottomNavBar showModal={showModal} />} */}
        <BottomNavBar showModal={showModal} />
        <ToolBar handleRoomListBtn={handleRoomListBtn} />
        <SideBar show={showSideBar} />
        {/* {showSideBar && <SideBar />} */}
        <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      </Container>
      {showUploadModal && <UploadModal onCloseModal={onCloseModal} />}
    </Wrapper>
  );
};

export default AppLayout;
