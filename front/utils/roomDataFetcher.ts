import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import axios, { AxiosError, AxiosResponse } from 'axios';

const getDefaultImgFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      start: number;
    };
  },
) => {
  try {
    const token = sessionStorage.getItem('TOKEN');
    const { start } = arg;
    const loadNumber = 12;

    const response = await axios.get(
      `${url}?start=${start}&limit=${loadNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return { imagelist: [...newDataList], loadDataLength: imagelist.length };
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return {};
  }
};

const getFilterImgFetcher = async (
  url: string,
  { arg }: { arg: { start: number; start_date?: string; end_date?: string } },
) => {
  try {
    const { start, start_date, end_date } = arg;
    const token = sessionStorage.getItem('TOKEN');
    const limit = 12;

    const response = await axios.get(
      `${url}?start=${start}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return { imagelist: [...newDataList], loadDataLength: imagelist.length };
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return {};
  }
};

const getImageData = async (
  url: string,
  { arg: imageList }: { arg: DImageData[] },
) => {
  try {
    if (imageList.length === 0) return [];

    const imgDataList: CImageData[] = [];

    const imgDataStateList = await Promise.allSettled(
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

    // console.log('요청리스트', imgDataStateList);

    imgDataStateList.forEach((data) => {
      if (data.status === 'fulfilled') {
        imgDataList.push(data.value);
      }
    });

    // console.log('결과 리스트', imgDataList);

    return [...imgDataList];
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('이미지 로딩에 실패했습니다.');
    }
    return [];
  }
};

const getUserListFetcher = async (url: string) => {
  const token = sessionStorage.getItem('TOKEN');
  // const [url, roomId] = arg;
  // if (!roomId) return null;

  try {
    const response = await axios.get(url, {
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
  { arg: invite_userlist }: { arg: number[] },
) => {
  try {
    if (invite_userlist.length === 0) return;

    const token = sessionStorage.getItem('TOKEN');
    const response = await axios.post(
      url,
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
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
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

const createRoomFetcher = async (
  url: string,
  { arg }: { arg: { selectMemberIdList: number[]; roomName: string } },
) => {
  try {
    const { selectMemberIdList, roomName } = arg;
    const response = await axios.post(
      url,
      {
        userlist: selectMemberIdList,
        title: roomName,
      },
      {
        headers: {
          Authorization: `${sessionStorage.getItem('TOKEN')}`,
          'Content-Type': 'application/json',
        },
      },
    );
    alert('방을 생성하였습니다.');
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
  }
};

const deleteMemberFetcher = async (
  url: string,
  { arg: memberId }: { arg: number },
) => {
  try {
    const token = sessionStorage.getItem('TOKEN');

    await axios.delete(url, {
      headers: { Authorization: token },
      data: {
        delete_room_user_id: memberId,
      },
    });

    alert('강퇴하였습니다.');

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        alert('방장이 아닙니다.');
      } else {
        alert('오류가 발생했습니다..');
      }
    }
    return false;
  }
};

export {
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getUserListFetcher,
  inviteFriendFetcher,
  getImageData,
  getMarkerFetcher,
  getUnreadImageList,
  deleteImageFetcher,
  leaveRoomFetcher,
  createRoomFetcher,
  deleteMemberFetcher,
};
