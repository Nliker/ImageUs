import { IImageData } from '@typing/db';
import axios, { AxiosResponse } from 'axios';

const getRoomImageListFetcher = async (arg: Array<string | undefined>) => {
  const token = sessionStorage.getItem('TOKEN');
  const [url, roomId, start] = arg;
  if (!roomId) return null;
  const loadNumber = 10;

  // 이미지를 10개씩 끊어서 불러오고 불러올 이미지의 시작 위치는 마지막 번호 + 1를 저장해서 사용한다.
  try {
    const imageInfoResponse = await axios.get(`/room/${roomId}/${url}?start=${start}&limit=${loadNumber}`, {
      headers: {
        Authorization: token,
      },
    });

    const { imagelist, read_history_row } = imageInfoResponse.data;
    return { imagelist, read_history_row };
    // 다음 서버에서 불러올 이미지 시작번호 업데이트
    // mutate(start + loadNumber + 1, false);

    // console.log(imageInfoResponse);
    // const imagelist = [...imageInfoResponse.data.imagelist];
    // console.log(imagelist);

    // const imageDataList: Array<{ id: number; imageData: AxiosResponse<object> | null }> = [];
    // const imageDataList = await Promise.all(
    //   imageInfoList.map(async (data: IImageData) => {
    //     const imageData = data.link
    //       ? await axios.get(`/image-download/${data.link}`, {
    //           headers: {
    //             Authorization: `${sessionStorage.getItem('TOKEN')}`,
    //           },
    //         })
    //       : null;
    //     const newObj = {
    //       id: data.id,
    //       imageData,
    //     };
    //     return newObj;
    //     // imageDataList.push(newObj);
    //   }),
    // );
    // console.log(imageDataList);
    // return imageDataList;

    // const testData = await axios.get(`/image-download/${imageInfoResponse.data.imagelist[1].link}`, {
    //   headers: {
    //     Authorization: `${sessionStorage.getItem('TOKEN')}`,
    //   },
    // });
    // const testObj = [{ id: 5, imageData: 'test' }, testData];
    // console.log(testObj);
    // return testObj;
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
      read_history_row: number;
    };
  },
) => {
  try {
    const prevImgData: Array<{ id: number; imageUrl: string; create_date: string }> = [];
    const nextImgData: Array<{ id: number; imageUrl: string; create_date: string }> = [];
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
        prevImgData.push({ id: imageData.id, imageUrl: url, create_date: create_date });
      }
    }
    // const imageDataList = await Promise.all(
    //   arg.map(async (imageData) => {
    //     if (!imageData.link) return { id: imageData.id, imageData: null };
    //     const res = await axios.get(`/image-download/${imageData.link}`, {
    //       headers: {
    //         Authorization: `${sessionStorage.getItem('TOKEN')}`,
    //       },
    //       responseType: 'blob',
    //     });

    //     const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
    //     console.log(url);
    //     return { id: imageData.id, imageUrl: url };
    //   }),
    // );
    const imageDataList = {
      prevImgData: [...prevImgData],
      nextImgData: [...nextImgData],
      deleteImgData: [...deleteImgData],
    };
    // console.log(imageDataList);
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

export { getRoomImageListFetcher, getUserListFetcher, inviteFriendFetcher, getImageData };
