export interface IRoomData {
  id: number;
  title: string;
  host_user_id?: string;
  userlist?: Array<object>;
}

export interface IFriendData {
  email?: string;
  id: string;
  name?: string;
  profile?: string;
}

export interface IImageData {
  created_at: string | null;
  id: number;
  link: string | null;
  user_id?: number | null;
}
