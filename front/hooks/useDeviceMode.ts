import { useContext } from 'react';
import CheckDeviceContext from './CheckDeviceContext';

export const useDeviceMode = () => {
  const context = useContext(CheckDeviceContext);

  if (!context) {
    throw new Error('예기치 못한 에러가 발생하였습니다..');
  }

  return context;
};
