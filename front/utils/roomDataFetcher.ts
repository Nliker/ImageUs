import { IImageData } from '@typing/db';
import axios, { AxiosError, AxiosResponse } from 'axios';

const getRoomImageListFetcher = async (url: string, { arg }: { arg: { roomId?: string; start: number } }) => {
  // 이미지를 10개씩 끊어서 불러오고 불러올 이미지의 시작 위치는 마지막 번호 + 1를 저장해서 사용한다.
  try {
    const token = sessionStorage.getItem('TOKEN');
    const { roomId, start } = arg;

    if (!roomId) return null;
    const loadNumber = 12;
    const imageInfoResponse = await axios.get(`${url}?start=${start}&limit=${loadNumber}`, {
      headers: {
        Authorization: token,
      },
    });

    const { imagelist } = imageInfoResponse.data;
    return { imagelist };
  } catch (error) {
    console.log(error);
  }
};

const getImageData = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      imagelist: Array<{ created_at: string; id: number; link: string; user_id: number }>;
    };
  },
) => {
  try {
    const imgData: Array<{ id: number; imageUrl: string; create_date: string }> = [];
    const deleteImgData: Array<{ id: number }> = [];

    for (const imageData of arg.imagelist) {
      if (!imageData.link) {
        deleteImgData.push({ id: imageData.id });
      } else {
        const res = await axios.get(`/image-download/${imageData.link}`, {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
          },
          responseType: 'blob',
        });

        const create_date = imageData.created_at.split(' ')[0];
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
        imgData.push({ id: imageData.id, imageUrl: url, create_date: create_date });
      }
    }
    const imageDataList = {
      imgData: [...imgData],
      deleteImgData: [...deleteImgData],
    };
    return imageDataList;
  } catch (error) {
    console.log(error);
  }
};

const getUserListFetcher = async (arg: Array<string | undefined>) => {
  const token = sessionStorage.getItem('TOKEN');
  const [url, roomId] = arg;
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
  const token = sessionStorage.getItem('TOKEN');
  const { roomId, invite_userlist } = arg;
  try {
    const response = await axios.post(
      `/room/${roomId}/user`,
      {
        invite_userlist,
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

const getMarkerFetcher = async (url: string) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const response = await axios.get(url, {
      headers: { Authorization: token },
    });

    // console.log(response);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert(err.response?.data.message);
    }
    return false;
  }
};

export { getRoomImageListFetcher, getUserListFetcher, inviteFriendFetcher, getImageData, getMarkerFetcher };
