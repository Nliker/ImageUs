import React, { memo, useEffect, useMemo, useRef } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import { CImageData, SelectTerm } from '@typing/client';
import ImageContent from './ImageContent';
import { ImageLayout, NotImageData } from './styles';
import Spinner from '@styles/Spinner';
import { useParams } from 'react-router';
import useIntersect from '@hooks/useIntersect';
import useRoomImgData from '@hooks/useRoomImgData';

interface Props {
  loadImgTypeInfo: {
    isfiltered: boolean;
    filterState: number;
    info: SelectTerm;
  };
  sectionName?: string;
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

  const memoizedRoomImageList = useMemo(() => roomImageList, [roomImageList]);

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

    console.log('fetchData', imgLoadEnd.current);
  };

  useEffect(() => {
    readStartNumber.current = 0;
    imgLoadEnd.current = false;
    console.log('이펙트 확인', readStartNumber);

    fetchData();

    return () => {
      clearRoomImageList();
    };
  }, [loadImgTypeInfo, roomId]);

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
      {memoizedRoomImageList.length !== 0 ? (
        <>
          <ImageLayout>
            {memoizedRoomImageList.map(
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
      ) : roomImgListLoading ? (
        <Spinner />
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
