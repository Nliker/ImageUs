import axios, { AxiosError } from 'axios';

const postUploadImage = async (url: string, { arg }: { arg: { uploadImageFile: FormData } }) => {
  try {
    await axios.post(url, arg.uploadImageFile, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('이미지를 업로드했습니다!');
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('오류가 발생했습니다..');
    }
    return;
  }
};

export { postUploadImage };
