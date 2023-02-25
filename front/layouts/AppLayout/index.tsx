import React, { useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import { useMediaQuery } from 'react-responsive';
import NavigationBar from '@components/NavigationBar';
import UploadModal from '@components/UploadModal';
import CreateRoomModal from '@components/CreateRoomModal';
import InviteMemberModal from '@components/InviteMemberModal';
import AlertBox from '@components/AlertBox';
import DetailPictureInfo from '@components/DetailPictureInfo';
import ModalLayout from '@layouts/ModalLayout';
import {
  OuterContainer,
  InnerContainer,
  ModalWrapper,
  Wrapper,
} from './styles';
import ToolBar from '@components/ToolBar';
import SideBar from '@components/SideBar';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
  isImageRoom?: boolean;
}

const AppLayout = ({ children, isImageRoom }: AppLayoutProps) => {
  const { data: showModalState } = useSWR('showModalState');
  const { data: userInfo } = useSWR('/user/my');

  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const toggleSidebar = useCallback(() => {
    setshowSideBar((prev) => !prev);
  }, [showSideBar]);

  const closeSidebar = useCallback(() => {
    setshowSideBar(false);
  }, [showSideBar]);

  return (
    <Wrapper>
      <OuterContainer showModal={showModalState}>
        {userInfo.logInState && <NavigationBar />}
        {/* {isMobile ? <BottomNavBar /> : <TopNavBar />} */}
        {/* <ToolBar handleSidebar={toggleSidebar} isImageRoom={isImageRoom} /> */}
        <InnerContainer
          style={
            userInfo.logInState ? { height: 'calc(100% - 66px)' } : undefined
          }
        >
          {/* {isMobile && (
            <ToolBar handleSidebar={toggleSidebar} isImageRoom={isImageRoom} />
          )} */}
          {isImageRoom && <SideBar show={showSideBar} close={closeSidebar} />}
          {children}
        </InnerContainer>
      </OuterContainer>
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
      {showModalState?.upload && (
        <ModalLayout modalName={'upload'}>
          <UploadModal />
        </ModalLayout>
      )}
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
