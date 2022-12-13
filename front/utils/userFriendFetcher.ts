import axios from 'axios';

const userId = sessionStorage.getItem('USER_ID');

const getUserFriendList = async (url: string) => {
  console.log('freindlist');
  try {
    const response = await axios.get(`/user/${userId}/${url}`, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    });
    const { friendlist } = await response.data;
    return friendlist;
  } catch (error) {
    console.error(error);
  }
};

const deleteUserFriend = async (url: string, { arg }: {arg: string}) => {
  try {
    const response = await axios.delete(`/user/${userId}/friend`, {
      data: {
        "delete_friend_user_id": arg,
      },
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export { getUserFriendList, deleteUserFriend };
