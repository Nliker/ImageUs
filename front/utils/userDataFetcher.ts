import { CImageData } from '@typing/client';
import { DImageData, DRoomData } from '@typing/db';
import axios, { AxiosError } from 'axios';

const getUserFriendList = async (url: string) => {
  console.log('freindlist');
  try {
    const userId = sessionStorage.getItem('USER_ID');
    const token = sessionStorage.getItem('TOKEN');
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
  const userId = sessionStorage.getItem('USER_ID');
  const token = sessionStorage.getItem('TOKEN');
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

const getImageData = async (
  url: string,
  { arg: newImageList }: { arg: DImageData[] },
) => {
  try {
    const imageDataList: CImageData[] = await Promise.all(
      newImageList.map(async (imageData) => {
        const res = await axios.get(`/image-download/${imageData.link}`, {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
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

const deleteUserFriend = async (url: string, { arg }: { arg: string }) => {
  try {
    const userId = sessionStorage.getItem('USER_ID');
    const response = await axios.delete(`/user/${userId}/friend`, {
      data: {
        delete_friend_user_id: arg,
      },
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    });
    console.log(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return false;
  }
};

const getUserRoomListFetcher = async (url: string) => {
  try {
    const userId = sessionStorage.getItem('USER_ID');
    const token = sessionStorage.getItem('TOKEN');

    const response = await axios.get(`/user/${userId}/${url}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const roomList = response.data.roomlist.map((roomData: DRoomData) => {
      return {
        id: roomData.id,
        title: roomData.title,
      };
    });
    return roomList;
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
    const token = sessionStorage.getItem('TOKEN');
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

const deleteUserImage = async (imageId: number) => {
  try {
    const token = sessionStorage.getItem('TOKEN');

    const response = await axios.delete('/image', {
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

export {
  getUserFriendList,
  deleteUserFriend,
  getUserRoomListFetcher,
  getUserImageList,
  getImageData,
  postUserInfoFetcher,
  deleteUserImage,
};
