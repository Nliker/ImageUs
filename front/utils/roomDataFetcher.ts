import axios from 'axios';

const token = sessionStorage.getItem('TOKEN');

const getImageListFetcher = async (arg: Array<string | undefined>) => {
  const [url, roomId] = arg;
  // console.log(arg);
  if (!roomId) return null;

  try {
    const response = await axios.get(`/room/${roomId}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
    const imageListData = response.data.imagelist;
    console.log(imageListData);
    return imageListData;
  } catch (error) {
    console.log(error);
  }
};

export { getImageListFetcher };
