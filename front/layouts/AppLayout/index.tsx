import React, { createContext, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import NavigationBar from '@components/NavigationBar';
import SideBar from '@components/SideBar';
import Modal from '@components/Modal';
import { OuterContainer, InnerContainer, Wrapper } from './styles';
import Spinner from '@styles/Spinner';
import useModal from '@hooks/useModal';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
  isImageRoom?: boolean;
}

interface ISidebarContext {
  setSidebarState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<ISidebarContext>({
  setSidebarState: () => {},
});

const AppLayout = ({ children, isImageRoom }: AppLayoutProps) => {
  const { currentModal } = useModal();
  const { data: userInfo } = useSWR('/user/my');
  const [sidebarState, setSidebarState] = useState<boolean>(false);
  const value = useMemo(() => ({ setSidebarState }), [setSidebarState]);

  const closeSidebar = useCallback(() => {
    setSidebarState(false);
  }, [sidebarState]);

  if (!userInfo || userInfo.logInState === 'LoggingOut') return <Spinner />;

  return (
    <Wrapper>
      <OuterContainer showModal={currentModal}>
        {userInfo?.logInState === 'LoggedIn' && <NavigationBar />}
        <InnerContainer
          style={
            userInfo?.logInState === 'LoggedIn'
              ? { height: 'calc(100% - 66px)' }
              : undefined
          }
        >
          {isImageRoom && <SideBar show={sidebarState} close={closeSidebar} />}
          <SidebarContext.Provider value={value}>
            {children}
          </SidebarContext.Provider>
        </InnerContainer>
      </OuterContainer>
      <Modal />
    </Wrapper>
  );
};

export default AppLayout;
