export interface DRoomData {
  id: number;
  title: string;
  host_user_id: number;
  userlist: DFriendData[];
}

export interface DFriendData {
  id: number;
  email: string;
  name: string;
  profile: string;
  user_type: string;
}

export interface DImageData {
  created_at: string | null;
  id: number;
  link: string | null;
  user_id: number | null;
}
