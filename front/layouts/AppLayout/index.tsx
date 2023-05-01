import React, { createContext, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import NavigationBar from '@components/NavigationBar';
import SideBar from '@components/SideBar';
import Modal from '@components/Modal';
import { OuterContainer, InnerContainer, Wrapper } from './styles';
import Spinner from '@styles/Spinner';
import useModal from '@hooks/useModal';
import SidebarContext from '@utils/SidebarContext';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
  isImageRoom?: boolean;
}

const AppLayout = ({ children, isImageRoom }: AppLayoutProps) => {
  const { data: modalData } = useModal();
  const { data: userInfo } = useSWR('/user/my');
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  // const toggleSidebar = useCallback(() => {
  //   setSidebarState((prev) => !prev);
  // }, []);

  // const value = useMemo(
  //   () => ({
  //     setState: setSidebarState,
  //   }),
  //   [sidebarState],
  // );
  // console.log('사이드바', sidebarState);

  if (!userInfo || userInfo.logInState === 'LoggingOut') return <Spinner />;

  return (
    <Wrapper>
      <OuterContainer showModal={modalData?.currentModal}>
        {userInfo?.logInState === 'LoggedIn' && <NavigationBar />}
        <InnerContainer
          style={
            userInfo?.logInState === 'LoggedIn'
              ? { height: 'calc(100% - 66px)' }
              : undefined
          }
        >
          <SidebarContext.Provider value={{ setSidebarState }}>
            {isImageRoom && <SideBar show={sidebarState} />}
            {children}
          </SidebarContext.Provider>
        </InnerContainer>
      </OuterContainer>
      <Modal modalData={modalData} />
    </Wrapper>
  );
};

export default AppLayout;
