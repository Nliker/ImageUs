import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { IImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import { getToken } from './getToken';
import { IFilteringData } from '@hooks/useRoomImgData';
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

    const response = await axios.post('/backapi' + url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageFile: any = arg.uploadImageFile.get('image');
    const link = window.URL.createObjectURL(imageFile);
    const { image_info } = response.data;
    const created_at =
      image_info.created_at !== null
        ? image_info.created_at.split(' ')[0]
        : null;
    const fileName = image_info.link ? image_info.link.split('/')[1] : 'Image';

    return { ...image_info, link, fileName, created_at };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지를 업로드하지 못하였습니다..다시 시도해주세요..');
    } else {
      throw new Error('예기치 못한 에러가 발생했습니다..새로고침 해주세요.');
    }
  }
};

const deleteUserImageFetcher = async (
  url: string,
  { arg: imageId }: { arg?: number },
) => {
  try {
    if (!imageId)
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');

    const { token } = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.delete('/backapi' + url, {
      headers: { Authorization: token },
      data: { delete_image_id: imageId },
    });

    return imageId;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지 삭제요청에 실패했습니다..다시시도 해주세요.');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

const getImageDataFetcher = async ({
  imageList,
}: {
  imageList: DImageData[];
}) => {
  try {
    const { token } = await getToken();

    if (!token) {
      const error = new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
      error.name = 'AuthError';
      throw error;
    }

    if (imageList.length === 0) return [];
    const imgDataList: IImageData[] = [];

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
        '이미지를 정상적으로 로드하지 못하였습니다..새로고침해주세요!',
      );
    } else {
      throw err;
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
      throw new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
    }

    const response = await axios.post('/backapi' + url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    const { image_info } = response.data;
    const imageFile: any = arg.uploadImageFile.get('image');
    const link = window.URL.createObjectURL(imageFile);
    const created_at =
      image_info.created_at !== null
        ? image_info.created_at.split(' ')[0]
        : null;
    const fileName = image_info.link ? image_info.link.split('/')[1] : 'Image';

    return { ...image_info, link, fileName, created_at };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지를 업로드하지 못하였습니다..다시시도 해주세요.');
    } else {
      throw new Error('예기치 못한 에러가 발생했습니다..새로고침 해주세요.');
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

    const { imagelist }: { imagelist: DImageData[] } = response.data;

    const imageDataList = await getImageDataFetcher({ imageList: imagelist });

    return [...imageDataList];
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

const getRoomImgsFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      loadStartNum: number;
      filteringData: IFilteringData;
      roomId: string;
    };
  },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      const error = new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
      error.name = 'AuthError';
      throw error;
    }

    const { loadStartNum, filteringData } = arg;

    const loadNumber = 12;
    const start_date = filteringData.filterSelectTerm.startDate;
    const end_date = filteringData.filterSelectTerm.endDate;

    const response = await axios.get(
      `/backapi${url}` +
        (filteringData.isFilterMode
          ? `/bydate?start=${loadStartNum}&limit=${loadNumber}&start_date=${start_date}&end_date=${end_date}`
          : `?start=${loadStartNum}&limit=${loadNumber}`),
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = response.data;
    const imageList = imagelist.filter((data: DImageData) => data.link);

    const imageDataList = await getImageDataFetcher({ imageList });
    return {
      imageList: imageDataList,
      loadCompleted: imagelist.length < 12 ? true : false,
      loadRoomId: arg.roomId,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(
        '이미지를 정상적으로 로드하지 못하였습니다..새로고침해주세요!',
      );
    } else {
      throw err;
    }
  }
};

const getUserImgsFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      loadStartNum: number;
    };
  },
) => {
  try {
    const { token } = await getToken();

    if (!token) {
      const error = new Error('로그인 정보가 없습니다..다시 로그인 해주세요');
      error.name = 'AuthError';
      throw error;
    }

    const loadNumber = 12;
    const { loadStartNum } = arg;

    const response = await axios.get(
      `/backapi${url}?start=${loadStartNum}&limit=${loadNumber}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const { imagelist } = await response.data;
    const imageList = imagelist.filter((data: DImageData) => data.link);

    const imageDataList = await getImageDataFetcher({ imageList });

    return {
      imageList: imageDataList,
      loadCompleted: imagelist.length < 12 ? true : false,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('이미지정보를 받아오지 못했습니다..');
    } else {
      throw err;
    }
  }
};

export {
  getUserImgsFetcher,
  getRoomImgsFetcher,
  getImageDataFetcher,
  getUnreadImgFetcher,
  uploadRoomImgFetcher,
  uploadUserImageFetcher,
  deleteRoomImgFetcher,
  deleteUserImageFetcher,
};
