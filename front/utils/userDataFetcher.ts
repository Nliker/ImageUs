import axios, { AxiosError } from 'axios';
import { DImageData } from '@typing/db';
import { getToken } from './getToken';
import { getErrorMessage } from './getErrorMessage';

const getUserFdListFetcher = async (url: string) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    const response = await axios.get('/backapi' + `/user/${userId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const { friendlist } = await response.data;
    return friendlist;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('친구 목록을 불러오는데 실패했습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
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

const deleteFriendFetcher = async (url: string, { arg }: { arg: number }) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    await axios.delete('/backapi' + `/user/${userId}/friend`, {
      data: {
        delete_friend_user_id: arg,
      },
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      const message = getErrorMessage(err);
      throw new Error(message);
    } else {
      throw new Error(
        '친구 목록에서 삭제하지 못하였습니다..다시 시도해주세요..',
      );
    }
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
  { arg }: { arg: { name: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const postData: { name: string } = { name: arg.name };

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
  { arg: friendId }: { arg: number },
) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
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
      throw new Error('자신을 친구로 추가할 수 없습니다.');
    }
  } catch (err) {
    if (
      err instanceof AxiosError &&
      (err.response?.status === 402 || err.response?.status === 404)
    ) {
      throw new Error(err.response?.data.message);
    } else {
      throw new Error('친구를 추가하지 못했습니다..다시 시도해주세요.');
    }
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
