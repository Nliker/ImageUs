import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken } from './getToken';

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

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
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

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
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const { start, start_date, end_date } = arg;
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
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    if (imageList.length === 0) return [];
    const imgDataList: CImageData[] = [];

    const MAX_RETRY_COUNT = 2;
    const axiosObj = axios.create();

    axiosObj.interceptors.response.use(undefined, (error: AxiosError) => {
      const config = error.config as AxiosCustomRequestConfig;
      config.retryCount = config.retryCount ?? 0;

      const shouldRetry = config.retryCount < MAX_RETRY_COUNT;
      if (shouldRetry) {
        config.retryCount += 1;
        config.headers = { ...config!.headers };

        return axiosObj.request(config);
      }

      return Promise.reject(error);
    });

    const imgDataStateList = await Promise.allSettled(
      imageList.map(async (imageInfo) => {
        const requestConfig: AxiosRequestConfig = {
          url: `/image-download/${imageInfo.link}`,
          method: 'GET',
          headers: { Authorization: token },
          responseType: 'blob',
        };

        const response = await axiosObj.request(requestConfig);

        const created_at =
          imageInfo.created_at !== null
            ? imageInfo.created_at.split(' ')[0]
            : null;
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: response.headers['content-type'] }),
        );
        return { ...imageInfo, link: url, created_at };
      }),
    );

    imgDataStateList.forEach((data) => {
      if (data.status === 'fulfilled') {
        imgDataList.push(data.value);
      }
    });

    return [...imgDataList];
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('이미지 로딩에 실패했습니다.');
    }
    return [];
  }
};

const getUserListFetcher = async (url: string) => {
  const token = await getToken();

  if (!token) {
    throw new Error();
  }

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

    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.post(
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
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
  }
};

const getMarkerFetcher = async (url: string) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.get(url, {
      headers: { Authorization: token },
    });

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
    const token = await getToken();

    if (!token) {
      throw new Error();
    }
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

const deleteRoomImgFetcher = async (
  url: string,
  { arg: imageId }: { arg: number },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete(url, {
      headers: { Authorization: token },
      data: {
        delete_room_image_id: imageId,
      },
    });
    alert('이미지를 삭제하였습니다.');
    return imageId;
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

const createRoomFetcher = async (
  url: string,
  { arg }: { arg: { selectMemberIdList: number[]; roomName: string } },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    const { selectMemberIdList, roomName } = arg;
    await axios.post(
      url,
      {
        userlist: selectMemberIdList,
        title: roomName,
      },
      {
        headers: {
          Authorization: token,
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
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

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
  deleteRoomImgFetcher,
  createRoomFetcher,
  deleteMemberFetcher,
};
