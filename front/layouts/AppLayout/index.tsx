import React, { useCallback, useState } from 'react';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { Container, ContentWrapper, RoomModalWrapper, Wrapper } from './styles';
import TopNavBar from '@components/TopNavBar';
import BottomNavBar from '@components/BottomNavBar';
import { useMediaQuery } from 'react-responsive';
import UploadModal from '@components/UploadModal';
import ContentImageModal from '@components/ContentImageModal';
import useSWR from 'swr';
import { Route, useLocation } from 'react-router';
import CreateRoomModal from '@components/CreateRoomModal';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: showUploadModal } = useSWR('showUploadModal');
  const { data: imageModalState } = useSWR('imageModalState');
  const { data: showModalState } = useSWR('showModalState');
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const currentUrl = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  // console.log(currentUrl);

  const handleRoomListBtn = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  // const showModal = useCallback(() => {
  //   setshowUploadModal(true);
  //   // uploadModalMutate(true, false);
  // }, [showUploadModal]);

  // const onCloseModal = useCallback(() => {
  //   setshowUploadModal(false);
  // }, []);

  // const onShowImageModal = useCallback(() => {
  //   setShowImageModal(true);
  // }, []);

  // const onCloseImageModal = useCallback(() => {
  //   setShowImageModal(false);
  // }, []);
  // console.log(imageModalState);
  return (
    <Wrapper>
      <Container showModal={showModalState}>
        <TopNavBar />
        {isMobile && <BottomNavBar />}
        {currentUrl.pathname === '/main_page' && (
          <>
            <ToolBar handleRoomListBtn={handleRoomListBtn} />
            <SideBar show={showSideBar} />
          </>
        )}
        <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      </Container>
      {showModalState?.upload && <UploadModal />}
      {showModalState?.image && <ContentImageModal />}
      {showModalState?.create_room && (
        <RoomModalWrapper>
          <CreateRoomModal />
        </RoomModalWrapper>
      )}
    </Wrapper>
  );
};

export default AppLayout;
