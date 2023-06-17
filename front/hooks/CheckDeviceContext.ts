import { createContext } from 'react';

interface ICheckDeviceContext {
  isMobile: boolean;
}

const CheckDeviceContext = createContext<ICheckDeviceContext>({
  isMobile: false,
});

export default CheckDeviceContext;
