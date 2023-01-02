import axios from 'axios';

const token = sessionStorage.getItem('TOKEN');

const getImageListFetcher = async (arg: Array<string | undefined>) => {
  const [url, roomId] = arg;
  // console.log(arg);
  if (!roomId) return null;

  try {
    const response = await axios.get(`/room/${roomId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const imageListData = response.data.imagelist;
    return imageListData;
  } catch (error) {
    console.log(error);
  }
};

const getUserListFetcher = async (arg: Array<string | undefined>) => {
  const [url, roomId] = arg;
  // console.log(arg);
  if (!roomId) return null;

  try {
    const response = await axios.get(`/room/${roomId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const userlist = response.data.userlist;
    return userlist;
  } catch (error) {
    console.log(error);
  }
};

const inviteFriendFetcher = async (
  url: string,
  { arg }: { arg: { invite_userlist: Array<string>; roomId: string } },
) => {
  const { roomId, invite_userlist } = arg;
  try {
    const response = await axios.post(
      `/room/${roomId}/user`,
      {
        invite_userlist
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export { getImageListFetcher, getUserListFetcher, inviteFriendFetcher };
