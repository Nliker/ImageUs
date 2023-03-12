import { DImageData } from '@typing/db';
import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';

const getDefaultImgFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      start: number;
    };
  },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const { start } = arg;
    const loadNumber = 12;

    const response = await axios.get(
      '/backapi' + `${url}?start=${start}&limit=${loadNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return { imagelist: [...newDataList], loadDataLength: imagelist.length };
  } catch (err) {
    alert('이미지정보를 받아오지 못했습니다..');
    return {};
  }
};

const getFilterImgFetcher = async (
  url: string,
  { arg }: { arg: { start: number; start_date?: string; end_date?: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const { start, start_date, end_date } = arg;
    const limit = 12;

    const response = await axios.get(
      '/backapi' +
        `${url}?start=${start}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return { imagelist: [...newDataList], loadDataLength: imagelist.length };
  } catch (err) {
    alert('이미지정보를 받아오지 못했습니다..');
    return {};
  }
};

const getUserListFetcher = async (url: string) => {
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
    const userlist = response.data.userlist;
    return userlist;
  } catch (err) {
    alert('친구목록을 받아오지 못했습니다..');
    return;
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

const getUnreadImageList = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }
    const response = await axios.get('/backapi' + url, {
      headers: { Authorization: token },
    });
    return [...response.data.imagelist];
  } catch (err) {
    console.error(err);
    return;
  }
};

const deleteRoomImgFetcher = async (
  url: string,
  { arg: imageId }: { arg: number },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: {
        delete_room_image_id: imageId,
      },
    });
    alert('이미지를 삭제하였습니다.');
    return imageId;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        alert(err.response.data.message);
      }
    } else {
      alert('이미지를 삭제하지 못하였습니다..');
    }
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

    alert('강퇴하였습니다.');

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        alert('방장이 아닙니다.');
      }
    } else {
      alert('요청을 실패하였습니다..');
    }
    return false;
  }
};

export {
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getUserListFetcher,
  inviteFriendFetcher,
  getUnreadImageList,
  deleteRoomImgFetcher,
  createRoomFetcher,
  deleteMemberFetcher,
};
