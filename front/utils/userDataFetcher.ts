import axios, { AxiosError } from 'axios';
import { DImageData } from '@typing/db';
import { getToken } from './getToken';

const getUserFdListFetcher = async (url: string) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get('/backapi' + `/user/${userId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const { friendlist } = await response.data;
    return friendlist;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getUserImgsFetcher = async (
  url: string,
  { arg: start }: { arg: number },
) => {
  const userId = sessionStorage.getItem('user_id');
  const { token } = await getToken();

  if (!token) {
    throw new Error();
  }

  const limit = 12;
  try {
    const response = await axios.get(
      '/backapi' + `/user/${userId}/imagelist?start=${start}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = await response.data;
    const filteredImageList = imagelist.filter((data: DImageData) => data.link);
    return {
      imagelist: filteredImageList,
      loadCompleted: imagelist.length < 12 ? true : false,
    };
  } catch (err) {
    alert('이미지정보를 받아오지 못했습니다..');
    return {};
  }
};

const getUserImgLenFetcher = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });

    const { imagelist_len } = response.data;

    return imagelist_len;
  } catch (err) {
    console.error(err);
    return;
  }
};

const deleteFriendFetcher = async (url: string, { arg }: { arg?: number }) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token || !arg) {
      throw new Error();
    }

    await axios.delete('/backapi' + `/user/${userId}/friend`, {
      data: {
        delete_friend_user_id: arg,
      },
      headers: {
        Authorization: token,
      },
    });
    alert('친구 목록에서 삭제하였습니다.');
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      alert(err.response.data.message);
    } else {
      alert('요청을 실패하였습니다..');
    }
    return false;
  }
};

const getUserRoomListFetcher = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const { roomlist } = response.data;

    return roomlist;
  } catch (err) {
    console.error('에러', err);
    return null;
  }
};

const changeUserInfoFetcher = async (
  url: string,
  { arg }: { arg: { name?: string; profile?: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const postData: { name?: string; profile?: string } = {};

    if (arg.name) postData.name = arg.name;
    if (arg.profile) postData.profile = arg.profile;

    await axios.post('/backapi' + url, postData, {
      headers: { Authorization: token },
    });
    alert('변경되었습니다.');
  } catch (err) {
    alert('요청을 실패하였습니다..');
    return;
  }
};

const addFriendFetcher = async (
  url: string,
  { arg: friendId }: { arg?: number },
) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token || !friendId) {
      throw new Error();
    }

    const response = await axios.post(
      '/backapi' + `/user/${userId}/friend`,
      {
        friend_user_id: friendId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (response.data === '0명 친구 생성 성공') {
      alert('자신을 친구로 추가할 수 없습니다.');
    } else {
      alert('성공적으로 추가하였습니다');
    }
  } catch (err) {
    if (
      err instanceof AxiosError &&
      (err.response?.status === 402 || err.response?.status === 404)
    ) {
      alert(err.response?.data.message);
    } else {
      alert('요청을 실패했습니다..');
    }
    return;
  }
};

export {
  getUserFdListFetcher,
  getUserRoomListFetcher,
  getUserImgsFetcher,
  getUserImgLenFetcher,
  addFriendFetcher,
  changeUserInfoFetcher,
  deleteFriendFetcher,
};
