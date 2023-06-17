import { createContext } from 'react';

export interface ISidebarContext {
  rightBarState: boolean;
  leftBarState: boolean;
  setRightbarState: (value: React.SetStateAction<boolean>) => void;
  setLeftbarState: (value: React.SetStateAction<boolean>) => void;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export default SidebarContext;
