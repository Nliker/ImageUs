import { DFriendData, DUserInfo } from './db';

export interface IAuthData {
  isAuthenticated: string;
  loading: boolean;
  error: Error;
  userInfo?: DUserInfo | null;
}

export interface ILoginData {
  isAuthenticated: string;
  userInfo: DUserInfo | null;
}

export interface IImageData {
  id: number;
  user_id: number | null;
  link: string;
  fileName: string;
  created_at: string | null;
  user_name?: string | null;
}

export interface ISelectTerm {
  startDate: string;
  endDate: string;
}

export interface IDetailPictureInfo {
  index: number;
  data: IImageData;
}

export interface IAertData {
  text: string;
  executeWork: () => void;
}

export type IUploadImgFunc = (uploadImageFile: FormData) => Promise<void>;

export interface IModalData {
  state: string;
  currentModal?: string;
  alertData?: IAertData;
  detailPictureInfo?: IDetailPictureInfo;
  uploadExecuteFunc?: (uploadImageFile: FormData) => Promise<void>;
}

export interface IRefineRoomData {
  id: number;
  title: string;
}

export interface IUserListByRoom {
  hostId: number;
  userList: DFriendData[];
}

export interface PrivateChildProps {
  userInfo: DUserInfo;
  roomId: string;
}
