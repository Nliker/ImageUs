export interface CImageData {
  id: number;
  user_id: number | null;
  link: string;
  fileName: string;
  created_at: string | null;
  user_name: string | null;
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
  type: string;
  text: string;
}

export interface IModalData {
  state: string;
  currentModal?: string;
  uploadImageLocate?: string;
  alertData?: IAertData;
  detailPictureInfo?: IDetailPictureInfo;
}
