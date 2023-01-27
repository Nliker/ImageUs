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
import AlertBox from '@components/AlertBox';
import DetailPictureInfo from '@components/DetailPictureInfo';
import ModalLayout from '@layouts/ModalLayout';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: showModalState } = useSWR('showModalState');
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <Wrapper>
      <Container showModal={showModalState}>
        <TopNavBar />
        {isMobile && <BottomNavBar />}
        <ContentWrapper show={showSideBar}>{children}</ContentWrapper>
      </Container>
      {showModalState?.detailPicture && (
        <ModalLayout modalName={'detailPicture'}>
          <DetailPictureInfo />
        </ModalLayout>
      )}
      {showModalState?.alert && (
        <ModalWrapper>
          <AlertBox />
        </ModalWrapper>
      )}
      {showModalState?.upload && <UploadModal />}
      {showModalState?.create_room && (
        <ModalLayout modalName={'create_room'}>
          <CreateRoomModal />
        </ModalLayout>
      )}
      {showModalState?.invite_member && (
        <ModalLayout modalName={'invite_member'}>
          <InviteMemberModal />
        </ModalLayout>
      )}
    </Wrapper>
  );
};

export default AppLayout;
