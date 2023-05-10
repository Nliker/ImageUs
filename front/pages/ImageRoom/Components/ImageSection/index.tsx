import React, { memo, useEffect, useRef } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import { CImageData, ILoadImgTypeInfo } from '@typing/client';
import Spinner from '@styles/Spinner';
import { useParams } from 'react-router';
import useIntersect from '@hooks/useIntersect';
import useRoomImgData from '@hooks/useRoomImgData';

import ImageContent from './ImageContent';
import { ImageLayout, NotImageData } from './styles';

interface Props {
  loadImgTypeInfo: ILoadImgTypeInfo;
}

interface IImageCard {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

const ImageSection = ({ loadImgTypeInfo }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const fetchingData = useRef(false);
  const imgLoadEnd = useRef(false);
  const readStartNumber = useRef(0);

  const { roomImageList, roomImgListLoading, loadImage, clearRoomImageList } =
    useRoomImgData(roomId);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);

      if (fetchingData.current || imgLoadEnd.current) {
        return;
      }
      fetchingData.current = true;

      await fetchData();

      fetchingData.current = false;
    },
    {
      threshold: 0.5,
    },
  );

  const fetchData = async () => {
    imgLoadEnd.current = await loadImage({
      readStartNumber: readStartNumber.current,
      loadImgTypeInfo,
    });
    if (!imgLoadEnd.current) {
      readStartNumber.current += 12;
    }
  };

  useEffect(() => {
    readStartNumber.current = 0;
    imgLoadEnd.current = false;

    fetchData();

    return () => {
      clearRoomImageList();
    };
  }, [
    loadImgTypeInfo.filterStartDate,
    loadImgTypeInfo.filterEndDate,
    loadImgTypeInfo.filterState,
    roomId,
  ]);

  const ImageCard = memo(
    ({ data, index, thisArr, observerRef }: IImageCard) => (
      <ImageContent
        data={data}
        index={index}
        thisArr={thisArr}
        observerRef={observerRef}
      />
    ),
  );

  return (
    <>
      {!roomImageList ? (
        <Spinner />
      ) : roomImageList.length !== 0 ? (
        <>
          <ImageLayout>
            {roomImageList.map(
              (image: CImageData, index: number, thisArr: CImageData[]) => (
                <ImageCard
                  key={image.id}
                  data={image}
                  index={index}
                  thisArr={thisArr}
                  observerRef={observerRef}
                />
              ),
            )}
          </ImageLayout>
          {roomImgListLoading && <Spinner />}
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
