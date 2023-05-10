import { DFriendData } from '@typing/db';
import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';
import { getErrorMessage } from './getErrorMessage';

const getUserListByRmFetcher = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });
    const userlist: DFriendData[] = response.data.userlist;
    return [...userlist];
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('방의 멤버 목록을 받아오지 못했습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
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
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
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
    if (err instanceof AxiosError) {
      throw new Error('친구를 초대하지 못했습니다..다시 시도해주세요.');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const createRoomFetcher = async (
  url: string,
  { arg }: { arg: { selectMemberIdList: number[]; roomName: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
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
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('방을 생성하지 못했습니다..다시시도 해주세요.');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const leaveRoomFetcher = async (
  url: string,
  { arg: roomId }: { arg: string },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: { delete_user_room_id: roomId },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('방에서 나가지 못하였습니다..다시시도 해주세요.');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const deleteMemberFetcher = async (
  url: string,
  { arg: memberId }: { arg: number },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: {
        delete_room_user_id: memberId,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('멤버를 강퇴하지 못했습니다..다시시도 해주세요.');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
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
