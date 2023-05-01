import { createContext, useContext } from 'react';

interface ISidebarContext {
  setSidebarState: (value: React.SetStateAction<boolean>) => void;
  // toggleSidebar: () => void;
  // setState: (value: boolean) => void;
}

const SidebarContext = createContext<ISidebarContext>({
  setSidebarState: () => {},
});

export default SidebarContext;

export const useSidebarContext = () => useContext(SidebarContext);
