import React, { useCallback, useState } from 'react';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';
import { Container, ContentWrapper, ModalWrapper, Wrapper } from './styles';
import TopNavBar from '@components/TopNavBar';
import BottomNavBar from '@components/BottomNavBar';
import { useMediaQuery } from 'react-responsive';
import UploadModal from '@components/UploadModal';
import ContentImageModal from '@components/ContentImageModal';
import useSWR from 'swr';
import { Route, useLocation } from 'react-router';
import CreateRoomModal from '@components/CreateRoomModal';
import InviteMemberModal from '@components/InviteMemberModal';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: showModalState } = useSWR('showModalState');
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleRoomListBtn = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  return (
    <Wrapper>
      <Container showModal={showModalState}>
        <TopNavBar />
        {isMobile && <BottomNavBar />}
        <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      </Container>
      {showModalState?.upload && <UploadModal />}
      {showModalState?.image && <ContentImageModal />}
      {showModalState?.create_room && (
        <ModalWrapper>
          <CreateRoomModal />
        </ModalWrapper>
      )}
      {showModalState?.invite_member && (
        <ModalWrapper>
          <InviteMemberModal />
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default AppLayout;
