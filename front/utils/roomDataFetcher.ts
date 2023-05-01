import { DFriendData, DImageData } from '@typing/db';
import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';

const getUserListByRmFetcher = async (url: string) => {
  const { token } = await getToken();

  if (!token) {
    throw new Error();
  }

  try {
    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });
    const userlist: DFriendData[] = response.data.userlist;
    return [...userlist];
  } catch (err) {
    throw new Error('예기치 못한 오류가 발생하였습니다.');
  }
};

const inviteFriendFetcher = async (
  url: string,
  { arg: invite_userlist }: { arg: number[] },
) => {
  try {
    if (invite_userlist.length === 0) return;

    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.post(
      '/backapi' + url,
      {
        invite_userlist,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (err) {
    alert('친구를 초대하지 못했습니다..');
    return;
  }
};

const createRoomFetcher = async (
  url: string,
  { arg }: { arg: { selectMemberIdList: number[]; roomName: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const { selectMemberIdList, roomName } = arg;
    await axios.post(
      '/backapi' + url,
      {
        userlist: selectMemberIdList,
        title: roomName,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    alert('방을 생성하였습니다.');
  } catch (err) {
    alert('방을 생성하지 못했습니다..');
    return;
  }
};

const leaveRoomFetcher = async (
  url: string,
  { arg: roomId }: { arg?: string },
) => {
  try {
    if (!roomId) throw new Error('올바른 요청이 아닙니다.');
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: { delete_user_room_id: roomId },
    });

    alert('성공적으로 나갔습니다.');
  } catch (err) {
    alert('요청을 실패했습니다..');
    return;
  }
};

const deleteMemberFetcher = async (
  url: string,
  { arg: memberId }: { arg: number },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: {
        delete_room_user_id: memberId,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 403) {
      throw new Error('방장이 아닙니다.');
      // alert('방장이 아닙니다.');
    } else {
      throw new Error('예기치 못한 오류가 발생하였습니다.');
      // alert('예기치 못한 오류가 발생하였습니다.');
    }
  }
};

export {
  getUserListByRmFetcher,
  inviteFriendFetcher,
  createRoomFetcher,
  deleteMemberFetcher,
  leaveRoomFetcher,
};
