import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken } from './getToken';
import { getErrorMessage } from './getErrorMessage';

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

const uploadRoomImgFetcher = async (
  [url, type]: [string, string],
  { arg }: { arg: { uploadImageFile: FormData } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    await axios.post('/backapi' + url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지를 업로드하지 못하였습니다..다시 시도해주세요..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const deleteUserImageFetcher = async (
  url: string,
  { arg: imageId }: { arg?: number },
) => {
  try {
    if (!imageId) throw new Error('올바른 요청이 아닙니다.');

    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: { delete_image_id: imageId },
    });

    alert('이미지를 삭제하였습니다!');
    return imageId;
  } catch (err) {
    alert('이미지 삭제요청에 실패했습니다..');
    return;
  }
};

const getImageDataFetcher = async (
  url: string,
  { arg: imageList }: { arg: DImageData[] },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
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
          url: `/imageapi/image-download/${imageInfo.link}`,
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
        const fileName = imageInfo.link
          ? imageInfo.link.split('/')[1]
          : 'Image';
        return { ...imageInfo, link: url, fileName, created_at };
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
      throw new Error(
        '친구 목록에서 삭제하지 못하였습니다..다시 시도해주세요..',
      );
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const uploadUserImageFetcher = async (
  url: string,
  { arg }: { arg: { uploadImageFile: FormData } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    const response = await axios.post('/backapi' + url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    const { image_info }: { image_info: DImageData } = response.data;

    return { image_info };
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      alert('파일이 존재하지 않습니다.');
    } else if (err instanceof Error) {
      alert('이미지를 업로드하지 못하였습니다..');
    }
    return;
  }
};

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
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    const { start } = arg;
    const loadNumber = 12;

    const response = await axios.get(
      '/backapi' + `${url}?start=${start}&limit=${loadNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return {
      imagelist: newDataList,
      loadCompleted: imagelist.length < 12 ? true : false,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지정보를 받아오지 못했습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const getFilterImgFetcher = async (
  url: string,
  { arg }: { arg: { start: number; start_date?: string; end_date?: string } },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    const { start, start_date, end_date } = arg;
    const limit = 12;

    const response = await axios.get(
      '/backapi' +
        `${url}?start=${start}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const newDataList = imagelist.filter((data: DImageData) => data.link);

    return {
      imagelist: newDataList,
      loadCompleted: imagelist.length < 12 ? true : false,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지정보를 받아오지 못했습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const getUnreadImgFetcher = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }
    const response = await axios.get('/backapi' + url, {
      headers: { Authorization: token },
    });
    return response.data.imagelist;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('실시간 이미지를 업데이트하지 못하였습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const deleteRoomImgFetcher = async (
  [url, type]: [string, string],
  { arg: imageId }: { arg: number },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: {
        delete_room_image_id: imageId,
      },
    });
    return imageId;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지를 삭제하지 못하였습니다..다시 시도해주세요..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

export {
  getImageDataFetcher,
  getDefaultImgFetcher,
  getFilterImgFetcher,
  uploadRoomImgFetcher,
  deleteRoomImgFetcher,
  uploadUserImageFetcher,
  deleteUserImageFetcher,
  getUnreadImgFetcher,
};
