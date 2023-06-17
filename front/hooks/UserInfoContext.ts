import { DRoomData, DUserInfo } from '@typing/db';
import { createContext } from 'react';

export interface IUserInfo {
  userInfo: DUserInfo;
}

const UserInfoContext = createContext<IUserInfo | undefined>(undefined);

export default UserInfoContext;
