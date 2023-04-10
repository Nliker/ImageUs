import React, { memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { CImageData } from '@typing/client';
import { ImageLayout, NotImageData, Wrapper } from './styles';
import useIntersect from '@hooks/useIntersect';
import { getImageData } from '@utils/imageFetcher';
import { getUserImageList } from '@utils/userDataFetcher';
import Spinner from '@styles/Spinner';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';
import ImageContent from './ImageContent';

const MyPictures = () => {
  const userId = sessionStorage.getItem('user_id');

  /*

    유저의 개인 이미지를 받아오는 hook

*/

  const {
    data: userImgList,
    trigger: userImgListTrigger,
    isMutating: userImgListLoading,
  } = useSWRMutation(`/user/${userId}/imagelist`, getUserImageList);

  const { trigger: imageDataTrigger, isMutating: imageDataLoading } =
    useSWRMutation('/user/image-download', getImageData);

  /*

    실제 화면에 보여줄 이미지데이터들을` 저장하는 배열

  */

  const { data: userImage, mutate: mutateUserImage } = useSWR<CImageData[]>(
    '/user/imageDataList',
  );

  const [readStartNumber, setReadStartNumber] = useState(0);
  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (
        !userImgListLoading &&
        !imageDataLoading &&
        userImgList?.loadDataLength === 12
      ) {
        userImgListTrigger(readStartNumber);
      }
    },
    {
      threshold: 0.5,
    },
  );

  /*

    사진첩에 접속할 때 초기화 시키고 이미지 리스트요청을 트리거하는 effect 

  */

  useEffect(() => {
    userImgListTrigger(readStartNumber);

    return () => {
      setReadStartNumber(0);
      mutateUserImage(undefined, false);
    };
  }, []);

  useEffect(() => {
    if (!userImgList || userImgListLoading) return;

    setReadStartNumber((prev) => prev + 12);

    mutateUserImage(async () => await imageDataTrigger(userImgList.imagelist), {
      populateCache: (newData, currentData) => {
        if (!currentData) {
          return [...newData];
        } else {
          return [...currentData, ...newData];
        }
      },
      revalidate: false,
    });
  }, [userImgList]);

  const imageCard = (
    data: CImageData,
    index: number,
    thisArr: CImageData[],
  ) => (
    <ImageContent
      key={data.id}
      data={data}
      index={index}
      thisArr={thisArr}
      observerRef={observerRef}
    />
  );

  if (!userImage) return <Spinner />;

  return (
    <Wrapper>
      {userImage.length !== 0 ? (
        <>
          <ImageLayout>{userImage.map(imageCard)}</ImageLayout>
          {(imageDataLoading || userImgListLoading) && <Spinner />}
        </>
      ) : (
        <NotImageData>
          <IconContext.Provider
            value={{
              size: '30%',
              style: { display: 'inline-block', maxWidth: '250px' },
            }}
          >
            <FcRemoveImage />
          </IconContext.Provider>
          <span>이미지가 없습니다.</span>
        </NotImageData>
      )}
    </Wrapper>
  );
};

export default memo(MyPictures);
