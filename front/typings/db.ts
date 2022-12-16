import { NamedTupleMember } from "typescript";

export interface IRoomData {
    id: number;
    title: string;
    host_user_id?: string,
    userlist?: Array<object>
}

export interface IFriendData {
    email?: string,
    id: string,
    name?: string,
    profile?: string
}

export interface IImageData {
    id: number,
    link: string,
    user_id: number
}