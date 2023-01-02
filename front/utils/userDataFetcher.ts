import { IRoomData } from '@typing/db';
import axios from 'axios';
import { mutate } from 'swr';

const userId = sessionStorage.getItem('USER_ID');
const token = sessionStorage.getItem('TOKEN');

const getUserFriendList = async (url: string) => {
  console.log('freindlist');
  try {
    const response = await axios.get(`/user/${userId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const { friendlist } = await response.data;
    return friendlist;
  } catch (error) {
    console.error(error);
  }
};

const getUserImageList = async (arg: [string, number]) => {
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
  } catch (error) {
    console.error(error);
  }
};

const deleteUserFriend = async (url: string, { arg }: { arg: string }) => {
  try {
    const response = await axios.delete(`/user/${userId}/friend`, {
      data: {
        delete_friend_user_id: arg,
      },
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getUserRoomListFetcher = async (url: string) => {
  return axios
    .get(`/user/${userId}/${url}`, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    })
    .then((res) => {
      const { data } = res;
      const roomList = data.roomlist.map((roomData: IRoomData) => {
        return {
          id: roomData.id,
          title: roomData.title,
        };
      });
      return roomList;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getUserFriendList, deleteUserFriend, getUserRoomListFetcher, getUserImageList };
