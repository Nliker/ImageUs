import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import axios, { AxiosError, AxiosResponse } from 'axios';

const getRoomImageListFetcher = async (
  url: string,
  { arg }: { arg: { roomId?: string; start: number } },
) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const { roomId, start } = arg;

    if (!roomId) return null;
    const loadNumber = 12;
    const imageInfoResponse = await axios.get(
      `${url}?start=${start}&limit=${loadNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = imageInfoResponse.data;
    const nowImageList: DImageData[] = [];
    const todayImageList: DImageData[] = [];
    const previousImageList: DImageData[] = [];
    // 날짜 00-00-00 형태로 바꾸어 넣기
    const currentDate = new Date();
    const os = currentDate.getTimezoneOffset();
    const currentDateFormat = new Date(currentDate.getTime() - os * 60 * 1000)
      .toJSON()
      .slice(0, 10);
    for (const imageInfo of imagelist) {
      if (!imageInfo.link) continue;
      const infoDate = imageInfo.created_at.split(' ')[0];
      const createTime = new Date(imageInfo.created_at).getTime();

      // 1시간 안에 올라온 게시물은 nowImageList에 넣음
      if (currentDate.getTime() <= createTime + 60 * 60 * 1000) {
        nowImageList.push(imageInfo);
      } else if (infoDate === currentDateFormat) {
        todayImageList.push(imageInfo);
      } else {
        previousImageList.push(imageInfo);
      }
    }

    return {
      nowImageList,
      todayImageList,
      previousImageList,
      loadDataLength: imagelist.length,
    };
  } catch (error) {
    console.log(error);
  }
};

const getImageData = async (
  key: string,
  {
    arg: imageList,
  }: {
    arg: DImageData[];
  },
) => {
  try {
    // const currentData = arg.currentData ?? [];

    // if (arg.imagelist.length === 0) return [...currentData];
    if (imageList.length === 0) return [];

    const imgDataList: CImageData[] = await Promise.all(
      imageList.map(async (imageInfo) => {
        const res = await axios.get(`/image-download/${imageInfo.link}`, {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
          },
          responseType: 'blob',
        });

        const created_at =
          imageInfo.created_at !== null
            ? imageInfo.created_at.split(' ')[0]
            : null;
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers['content-type'] }),
        );
        return { ...imageInfo, link: url, created_at };
      }),
    );

    // if (arg.realTime) return [...imgDataList, ...currentData];
    // return [...currentData, ...imgDataList];
    return [...imgDataList];
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return [];
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
    const { marker } = response.data;
    return marker;
  } catch (err) {
    if (err instanceof AxiosError) {
      alert(err.response?.data.message);
    }
    return false;
  }
};

const getUnreadImageList = async (url: string) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const response = await axios.get(url, {
      headers: { Authorization: token },
    });
    return [...response.data.imagelist];
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
  }
};

const deleteImageFetcher = async ([url, arg]: [string, number]) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const response = await axios.delete(url, {
      headers: { Authorization: token },
      data: {
        delete_room_image_id: arg,
      },
    });
    alert(response.data);
    return arg;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403 || err.response?.status === 404) {
        alert(err.response.data);
      } else {
        alert('오류가 발생했습니다..');
      }
    }
  }
};

const leaveRoomFetcher = async (roomId: string) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const userId = sessionStorage.getItem('USER_ID');
    const response = await axios.delete(`/user/${userId}/room`, {
      headers: { Authorization: token },
      data: { delete_user_room_id: roomId },
    });

    alert(response.data.message);
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
  getRoomImageListFetcher,
  getUserListFetcher,
  inviteFriendFetcher,
  getImageData,
  getMarkerFetcher,
  getUnreadImageList,
  deleteImageFetcher,
  leaveRoomFetcher,
};
