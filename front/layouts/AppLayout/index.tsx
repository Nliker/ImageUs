import React, { useEffect, useState } from 'react';

import NavigationBar from '@components/NavigationBar';
import SideBar from '@components/SideBar';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import SidebarContext from '@utils/SidebarContext';
import { OuterContainer, InnerContainer, Wrapper } from './styles';
import CheckDeviceContext from '@utils/CheckDeviceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: modalData } = useModal();
  const location = useLocation();
  const isImageRoom = location.pathname.split('/')[1] === 'room';

  const [sidebarState, setSidebarState] = useState<boolean>(false);
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
      <OuterContainer showModal={modalData?.currentModal}>
        <NavigationBar />
        <CheckDeviceContext.Provider value={{ isMobile: isMobile }}>
          <InnerContainer>
            <SidebarContext.Provider value={{ setSidebarState }}>
              {isImageRoom && <SideBar show={sidebarState} />}
              {children}
            </SidebarContext.Provider>
          </InnerContainer>
        </CheckDeviceContext.Provider>
      </OuterContainer>
      <Modal modalData={modalData} />
      <ToastContainer />
    </Wrapper>
  );
};

export default AppLayout;
