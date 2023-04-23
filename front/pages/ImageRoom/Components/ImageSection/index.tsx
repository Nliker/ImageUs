import React, { memo, useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { CImageData } from '@typing/client';
import ImageContent from './ImageContent';
import { ImageLayout, NotImageData } from './styles';
import Spinner from '@styles/Spinner';
import { useParams } from 'react-router';
import {
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getUnreadImageList,
} from '@utils/roomDataFetcher';
import { getImageData } from '@utils/imageFetcher';
import useIntersect from '@hooks/useIntersect';
import { SelectTerm } from '../MainSection';
import useImageData from '@hooks/useUserImgData';
import useRoomImgData from '@hooks/useRoomImgData';

interface Props {
  loadImgTypeInfo: { isfiltered: boolean; info: SelectTerm };
  sectionName?: string;
}

const ImageSection = ({ sectionName, loadImgTypeInfo }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();

  /*

  실시간 이미지 로드 훅

*/

  // const { data: realTimeImageList } = useSWR(
  //   `/room/${roomId}/unread-imagelist`,
  //   getUnreadImageList,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount: false,
  //     revalidateOnReconnect: false,
  //     refreshInterval: 300000,
  //   },
  // );

  /*

  현재까지 읽은 이미지 번호에 맞춰 이미지 링크를 저장하는 배열으로
  defaultImageList은 전체 게시물에 대한 이미지들을 저장하는 리스트이고
  filterImageList은 기간 필터링된 이미지들을 저장하는 리스트입니다.

*/

  // const {
  //   data: defaultImageList,
  //   trigger: defaultImgListTrigger,
  //   isMutating: defaultImgListLoading,
  // } = useSWRMutation(`/room/${roomId}/imagelist`, getDefaultImgFetcher);

  // const {
  //   data: filterImageList,
  //   trigger: filterImgListTrigger,
  //   isMutating: filterImgListLoading,
  // } = useSWRMutation(`/room/${roomId}/imagelist/bydate`, getFilterImgFetcher);

  /*

  실제 이미지 주소리스트를 받는 함수

*/

  // const { trigger: imgDataListTrigger, isMutating: imgDataListLoading } =
  //   useSWRMutation('/room/imageData', getImageData);

  /*

  실제 이미지 주소리스트가 저장되는 배열

*/

  const {
    roomImageList,
    defaultImageLoading,
    filterImageLoading,
    loadNextDefaultImage,
    loadNextFilterImage,
    setRoomImagePayload,
    clearRoomImageList,
  } = useRoomImgData(roomId);
  // const { data: roomImage, mutate: mutateRoomImage } = useSWR<
  //   CImageData[] | null
  // >(`/image/${roomId}`);

  // const [readStartNumber, setReadStartNumber] = useState(0);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);

      if (!loadImgTypeInfo.isfiltered) {
        loadNextDefaultImage();
        // if (
        //   !defaultImgListLoading &&
        //   !imgDataListLoading &&
        //   defaultImageList?.loadDataLength === 12
        // ) {
        //   defaultImgListTrigger({
        //     start: readStartNumber,
        //   });
        // }
      } else {
        loadNextFilterImage();
        // if (
        //   !filterImgListLoading &&
        //   !imgDataListLoading &&
        //   filterImageList?.loadDataLength === 12
        // ) {
        //   filterImgListTrigger({
        //     start: readStartNumber,
        //     start_date: loadImgTypeInfo.info?.startDate,
        //     end_date: loadImgTypeInfo.info?.endDate,
        //   });
        // }
      }
    },
    {
      threshold: 0.5,
    },
  );

  useEffect(() => {
    if (loadImgTypeInfo.isfiltered) {
      if (!filterImageLoading) {
        loadNextFilterImage();
      }
      // filterImgListTrigger({
      //   start: 0,
      //   start_date: loadImgTypeInfo.info?.startDate,
      //   end_date: loadImgTypeInfo.info?.endDate,
      // });
    } else {
      if (!defaultImageLoading) {
        loadNextDefaultImage();
      }
      // defaultImgListTrigger({
      //   start: 0,
      // });
    }

    return () => {
      clearRoomImageList();
      setRoomImagePayload({
        startDate: loadImgTypeInfo.info.startDate,
        endDate: loadImgTypeInfo.info.endDate,
      });

      // setReadStartNumber(0);
      // mutateRoomImage(null, false);
    };
  }, [loadImgTypeInfo, roomId]);

  // useEffect(() => {
  //   const newImgList = loadImgTypeInfo.isfiltered
  //     ? filterImageList?.imagelist
  //     : defaultImageList?.imagelist;

  //   if (!newImgList) return;

  //   /*

  //    서버에서 받은 모든 이미지가 null인 경우에 intersectionObserver가 동작하지 않음으로
  //    이미지 로드 요청을 한번 더 보낸다.

  //   */
  //   if (
  //     newImgList.length !== 0 &&
  //     newImgList.every((value) => value === null)
  //   ) {
  //     if (loadImgTypeInfo.isfiltered) {
  //       filterImgListTrigger({
  //         start: readStartNumber + 12,
  //         start_date: loadImgTypeInfo.info?.startDate,
  //         end_date: loadImgTypeInfo.info?.endDate,
  //       });
  //     } else {
  //       defaultImgListTrigger({
  //         start: readStartNumber + 12,
  //       });
  //     }
  //     return;
  //   }

  //   setReadStartNumber((prev) => prev + 12);

  //   mutateRoomImage(async () => await imgDataListTrigger(newImgList), {
  //     populateCache: (newData, currentData) => {
  //       if (currentData) {
  //         return [...currentData, ...newData];
  //       } else {
  //         return [...newData];
  //       }
  //     },
  //     revalidate: false,
  //   });
  // }, [defaultImageList, filterImageList]);

  // useEffect(() => {
  //   if (!realTimeImageList) return;

  //   mutateRoomImage(async () => await imgDataListTrigger(realTimeImageList), {
  //     populateCache: (newData, currentData) => {
  //       if (currentData) {
  //         return [...newData, ...currentData];
  //       } else {
  //         return [...newData];
  //       }
  //     },
  //     revalidate: false,
  //   });
  // }, [realTimeImageList]);

  const imageCard = (
    data: CImageData,
    index: number,
    thisArr: CImageData[],
  ) => (
    <ImageContent
      key={data.id}
      sectionName={sectionName}
      data={data}
      index={index}
      thisArr={thisArr}
      observerRef={observerRef}
    />
  );

  if (!roomImageList) return <Spinner />;

  return (
    <>
      {roomImageList.length !== 0 ? (
        <>
          <ImageLayout>{roomImageList.map(imageCard)}</ImageLayout>
          {(filterImageLoading || defaultImageLoading) && <Spinner />}
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
    </>
  );
};

export default memo(ImageSection);
