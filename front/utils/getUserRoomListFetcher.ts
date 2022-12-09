import { IRoomData } from '@typing/db';
import axios from 'axios';

const getUserRoomListFetcher = async (url: string) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    })
    .then((res) => {
      const { data } = res;
      console.log(data);
      const roomList = data.roomlist.map((roomData: IRoomData) => {
        return {
          id: roomData.id,
          title: roomData.title
        };
      });
      return roomList;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getUserRoomListFetcher;
