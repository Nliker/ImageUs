import React, { memo, useEffect, useMemo, useRef } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import { CImageData, SelectTerm } from '@typing/client';
import Spinner from '@styles/Spinner';
import { useParams } from 'react-router';
import useIntersect from '@hooks/useIntersect';
import useRoomImgData from '@hooks/useRoomImgData';

import ImageContent from './ImageContent';
import { ImageLayout, NotImageData, Target } from './styles';

interface IImgSectionProps {
  roomImageList: CImageData[];
  roomImgListLoading: boolean;
}

interface IProps {
  roomId: string;
  imageSectionProps: IImgSectionProps;
  observerRef: React.MutableRefObject<null> | null;
}

const ImageSection = ({ imageSectionProps, observerRef }: IProps) => {
  const { roomImageList, roomImgListLoading } = imageSectionProps;

  return (
    <>
      {roomImageList.length !== 0 ? (
        <>
          <ImageLayout>
            {roomImageList.map((image: CImageData, index: number) => (
              <ImageContent key={image.id} data={image} index={index} />
            ))}
          </ImageLayout>
          <Target ref={observerRef} />
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
