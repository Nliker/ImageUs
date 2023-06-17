import React, { useEffect, useState } from 'react';

import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import CheckDeviceContext from '@hooks/CheckDeviceContext';
import { ToastContainer } from 'react-toastify';
import SidebarContext from '@hooks/SidebarContext';
import LeftNavMenu from '@components/LeftNavMenu';
import 'react-toastify/dist/ReactToastify.css';
import { OuterContainer, Wrapper } from './styles';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: modalData } = useModal();

  const [rightBarState, setRightbarState] = useState<boolean>(false);
  const [leftBarState, setLeftbarState] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <Wrapper>
      <CheckDeviceContext.Provider value={{ isMobile: isMobile }}>
        <SidebarContext.Provider
          value={{
            rightBarState,
            leftBarState,
            setLeftbarState,
            setRightbarState,
          }}
        >
          <OuterContainer showModal={modalData?.currentModal}>
            <LeftNavMenu />
            {children}
          </OuterContainer>
        </SidebarContext.Provider>
      </CheckDeviceContext.Provider>
      <Modal modalData={modalData} />
      <ToastContainer />
    </Wrapper>
  );
};

export default AppLayout;
