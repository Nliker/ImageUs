import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';

const postUploadImage = async (
  url: string,
  { arg }: { arg: { uploadImageFile: FormData } },
) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error();
    }

    await axios.post(url, arg.uploadImageFile, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('이미지를 업로드하지 못하였습니다..');
    }
    return;
  }
};

export { postUploadImage };
