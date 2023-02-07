export interface DRoomData {
  id: number;
  title: string;
  host_user_id?: string;
  userlist?: Array<object>;
}

export interface DFriendData {
  email?: string;
  id: number;
  name: string;
  profile?: string;
}

export interface DImageData {
  created_at: string | null;
  id: number;
  link: string | null;
  user_id: number | null;
  user_name: string | null;
}
