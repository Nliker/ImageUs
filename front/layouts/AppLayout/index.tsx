import React, { useState } from 'react';

import NavigationBar from '@components/NavigationBar';
import SideBar from '@components/SideBar';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import SidebarContext from '@utils/SidebarContext';
import { OuterContainer, InnerContainer, Wrapper } from './styles';

interface AppLayoutProps {
  children?: React.ReactNode;
  roomId?: string;
  isImageRoom?: boolean;
}

const AppLayout = ({ children, isImageRoom }: AppLayoutProps) => {
  const { data: modalData } = useModal();
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  return (
    <Wrapper>
      <OuterContainer showModal={modalData?.currentModal}>
        <NavigationBar />
        <InnerContainer>
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
