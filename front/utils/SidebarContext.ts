import { createContext, useContext } from 'react';

interface ISidebarContext {
  setSidebarState: (value: React.SetStateAction<boolean>) => void;
}

const SidebarContext = createContext<ISidebarContext>({
  setSidebarState: () => {},
});

export default SidebarContext;

export const useSidebarContext = () => useContext(SidebarContext);
