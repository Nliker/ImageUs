import axios, { AxiosError } from 'axios';
import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import { getToken } from './getToken';

const getUserFriendList = async (url: string) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get(`/user/${userId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const { friendlist } = await response.data;
    return friendlist;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return false;
  }
};

const getUserImageList = async (
  url: string,
  { arg: start }: { arg: number },
) => {
  const userId = sessionStorage.getItem('user_id');
  const token = await getToken();

  if (!token) {
    throw new Error();
  }

  const limit = 12;
  try {
    const response = await axios.get(
      `/user/${userId}/imagelist?start=${start}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = await response.data;
    const filteredImageList = imagelist.filter((data: DImageData) => data.link);
    return { imagelist: filteredImageList, loadDataLength: imagelist.length };
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return;
  }
};

const getUserImageLen = async (url: string) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    const { imagelist_len } = response.data;

    return { imagelist_len };
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return;
  }
};

const getImageData = async (
  url: string,
  { arg: newImageList }: { arg: DImageData[] },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const imageDataList: CImageData[] = await Promise.all(
      newImageList.map(async (imageData) => {
        const res = await axios.get(`/image-download/${imageData.link}`, {
          headers: {
            Authorization: token,
          },
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers['content-type'] }),
        );
        const created_at =
          imageData.created_at?.split(' ')[0] ?? '삭제된 이미지';
        return { ...imageData, id: imageData.id, created_at, link: url };
      }),
    );

    return [...imageDataList];
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    console.log(err);
    return;
  }
};

const deleteUserFriend = async (url: string, { arg }: { arg: number }) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete(`/user/${userId}/friend`, {
      data: {
        delete_friend_user_id: arg,
      },
      headers: {
        Authorization: token,
      },
    });
    alert('친구 목록에서 삭제하였습니다.');
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('친구 목록에서 삭제하지 못하였습니다..');
    }
    return false;
  }
};

const getUserRoomListFetcher = async (url: string) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    // const roomList = response.data.roomlist.map((roomData: DRoomData) => {
    //   return {
    //     id: roomData.id,
    //     title: roomData.title,
    //   };
    // });

    const { roomlist } = response.data;

    return roomlist;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return null;
  }
};

const postUserInfoFetcher = async (
  url: string,
  { arg }: { arg: { name?: string; profile?: string } },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const postData: { name?: string; profile?: string } = {};

    if (arg.name) postData.name = arg.name;
    if (arg.profile) postData.profile = arg.profile;

    await axios.post(url, postData, {
      headers: { Authorization: token },
    });
    alert('변경되었습니다.');
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
      alert('오류가 발생했습니다..');
    }
    return;
  }
};

const deleteUserImage = async (
  url: string,
  { arg: imageId }: { arg: number },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.delete(url, {
      headers: { Authorization: token },
      data: { delete_image_id: imageId },
    });

    alert(response.data);
    return imageId;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
      alert('오류가 발생했습니다..');
    }
    return;
  }
};

const postNewFriend = async (
  url: string,
  { arg: friendId }: { arg: number },
) => {
  try {
    const userId = sessionStorage.getItem('user_id');
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.post(
      `/user/${userId}/friend`,
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
    if (err instanceof AxiosError) {
      console.log(err);
      alert(err.response?.data.message);
    }
    return;
  }
};

const leaveRoomFetcher = async (
  url: string,
  { arg: roomId }: { arg: string },
) => {
  try {
    if (!roomId) throw new Error('올바른 요청이 아닙니다.');
    const token = await getToken();
    const userId = sessionStorage.getItem('user_id');

    if (!token) {
      throw new Error();
    }

    await axios.delete(`/user/${userId}/room`, {
      headers: { Authorization: token },
      data: { delete_user_room_id: roomId },
    });

    alert('성공적으로 나갔습니다.');
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        alert(err.response.data);
      } else {
        alert('오류가 발생했습니다..');
      }
    }
  }
};

export {
  getUserFriendList,
  getUserRoomListFetcher,
  getUserImageList,
  getUserImageLen,
  getImageData,
  postNewFriend,
  postUserInfoFetcher,
  deleteUserFriend,
  deleteUserImage,
  leaveRoomFetcher,
};
