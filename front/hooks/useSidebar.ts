import { useContext } from 'react';
import SidebarContext, { ISidebarContext } from './SidebarContext';

export const useSidebar = (): ISidebarContext => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarContext.Provider');
  }

  return context;
};
