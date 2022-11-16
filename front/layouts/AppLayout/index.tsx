import React from 'react';
import NavBar from '@components/NavBar';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
