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

const getUserImageList = async (arg: [string, number]) => {
  const userId = sessionStorage.getItem('USER_ID');
  const token = sessionStorage.getItem('TOKEN');
  const start = arg[1];
  const limit = 10;
  try {
    const response = await axios.get(`/user/${userId}/imagelist?start=${start}&limit=${limit}`, {
      headers: {
        Authorization: token,
      },
    });
    // mutate('store/userImageLoadNumber', start + limit + 1, false);
    const { imagelist } = await response.data;
    return imagelist;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return false;
  }
};

const getImageData = async (url: string, { arg }: { arg: Array<DImageData> }) => {
  try {
    const imageDataList = await Promise.all(
      arg.map(async (imageData) => {
        if (!imageData.link) return null;
        const res = await axios.get(`/image-download/${imageData.link}`, {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
          },
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
        return { id: imageData.id, imageUrl: url };
      }),
    );

    return imageDataList;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return undefined;
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

export { getUserFriendList, deleteUserFriend, getUserRoomListFetcher, getUserImageList, getImageData };
