import React, { memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import ImageContentList from '@pages/ImageRoom/Components/ImageContentLayout';
import { CImageData } from '@typing/client';
import { Wrapper } from './styles';
import useIntersect from '@hooks/useIntersect';
import { getImageData } from '@utils/imageFetcher';
import { getUserImageList } from '@utils/userDataFetcher';
import Spinner from '@styles/Spinner';

const MyPictures = () => {
  const userId = sessionStorage.getItem('user_id');

  /*

    유저의 개인 이미지를 받아오는 hook

*/

  const {
    data: requestImageList,
    trigger: requestImageListInfo,
    isMutating: requestImageLoading,
  } = useSWRMutation(`/user/${userId}/imagelist`, getUserImageList);

  const { trigger: imageDataTrigger, isMutating: imageDataLoading } =
    useSWRMutation('/user/image-download', getImageData);

  const { data: userImageList, mutate: mutateUserImageList } = useSWR<
    CImageData[]
  >('/user/imageDataList');

  const [readStartNumber, setReadStartNumber] = useState(0);
  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (
        !requestImageLoading &&
        !imageDataLoading &&
        requestImageList?.loadDataLength === 12
      ) {
        requestImageListInfo(readStartNumber);
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
    requestImageListInfo(readStartNumber);

    // console.log('번호: ', readStartNumber);
    // if (readStartNumber === 0) {
    //   requestImageListInfo(readStartNumber);
    // }
    return () => {
      console.log('제거 확인');
      setReadStartNumber(0);
      mutateUserImageList(undefined, false);
    };
  }, []);

  useEffect(() => {
    if (!requestImageList || requestImageLoading) return;

    setReadStartNumber((prev) => prev + 12);
    // imageDataTrigger(requestImageList.imagelist).then((newImage) => {
    //   if (newImage) mutateUserImageList([...userImageList, ...newImage]);
    // });

    mutateUserImageList(
      async () => await imageDataTrigger(requestImageList.imagelist),
      {
        populateCache: (newData, currentData) => {
          if (!currentData) {
            return [...newData];
          } else {
            return [...newData, ...currentData];
          }
        },
        revalidate: false,
      },
    );
  }, [requestImageList]);

  return (
    <Wrapper>
      {!userImageList || requestImageLoading || imageDataLoading ? (
        <Spinner />
      ) : (
        <ImageContentList
          keyString={'my_picture'}
          ImageData={userImageList}
          isLoading={requestImageLoading || imageDataLoading}
          observerRef={observerRef}
        />
      )}
    </Wrapper>
  );
};

export default memo(MyPictures);
