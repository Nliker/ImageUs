export interface DRoomData {
  id: number;
  title: string;
  host_user_id: string;
  userlist: DFriendData[];
}

export interface DFriendData {
  id: number;
  email?: string;
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
