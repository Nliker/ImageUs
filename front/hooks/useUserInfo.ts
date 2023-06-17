import { useContext } from 'react';
import UserInfoContext, { IUserInfo } from './UserInfoContext';

export const useUserInfo = (): IUserInfo => {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error('유저 정보가 없습니다...');
  }

  return context;
};
