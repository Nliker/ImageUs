import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken } from './getToken';

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

const postUploadImage = async (
  url: string,
  { arg }: { arg: { uploadImageFile: FormData } },
) => {
  try {
    const { token, message } = await getToken();

    if (!token) {
      throw new Error(message);
    }

    await axios.post('/backapi' + url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      alert('파일이 존재하지 않습니다.');
    } else if (err instanceof Error) {
      alert('이미지를 업로드하지 못하였습니다..');
    }
    return;
  }
};

const deleteUserImage = async (
  url: string,
  { arg: imageId }: { arg: number },
) => {
  try {
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

// const getImageData = async (
//   url: string,
//   { arg: newImageList }: { arg: DImageData[] },
// ) => {
//   try {
//     const { token } = await getToken();

//     if (!token) {
//       throw new Error();
//     }

//     const imageDataList: CImageData[] = await Promise.all(
//       newImageList.map(async (imageData) => {
//         const res = await axios.get(
//           '/imageapi' + `/image-download/${imageData.link}`,
//           {
//             headers: {
//               Authorization: token,
//             },
//             responseType: 'blob',
//           },
//         );

//         const url = window.URL.createObjectURL(
//           new Blob([res.data], { type: res.headers['content-type'] }),
//         );
//         const created_at =
//           imageData.created_at?.split(' ')[0] ?? '삭제된 이미지';
//         return { ...imageData, id: imageData.id, created_at, link: url };
//       }),
//     );

//     return [...imageDataList];
//   } catch (err) {
//     alert('이미지를 받아오지 못하였습니다..');
//     return;
//   }
// };

const getImageData = async (
  url: string,
  { arg: imageList }: { arg: DImageData[] },
) => {
  try {
    const { token } = await getToken();

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
    alert('이미지를 받아오지 못했습니다..');
    return [];
  }
};

export { postUploadImage, deleteUserImage, getImageData };
