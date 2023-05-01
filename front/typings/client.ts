import { DFriendData } from './db';

export interface CImageData {
  id: number;
  user_id: number | null;
  link: string;
  fileName: string;
  created_at: string | null;
}

export interface SelectTerm {
  startDate: string;
  endDate: string;
}

export interface ILoadImgTypeInfo {
  isfiltered: boolean;
  filterState: number;
  filterStartDate: string;
  filterEndDate: string;
}

export interface IDetailPictureInfo {
  index: number;
  data: CImageData;
}

export interface IAertData {
  text: string;
  executeWork: () => void;
}

export interface IModalData {
  state: string;
  currentModal?: string;
  uploadImageLocate?: string;
  alertData?: IAertData;
  detailPictureInfo?: IDetailPictureInfo;
}

export interface IRefineRoomData {
  id: number;
  title: string;
}

export interface IUserListByRoom {
  hostId: number;
  userList: DFriendData[];
}
