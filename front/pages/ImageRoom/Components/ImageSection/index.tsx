import React, { memo } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import { CImageData } from '@typing/client';
import ImageContent from './ImageContent';
import { ImageLayout, NotImageData } from './styles';
import Spinner from '@styles/Spinner';

interface Props {
  ImageData: CImageData[];
  sectionName?: string;
  isLoading: boolean;
  observerRef?: React.MutableRefObject<null>;
  keyString?: string;
}

const ImageSection = ({
  ImageData,
  isLoading,
  observerRef,
  sectionName,
  keyString,
}: Props) => {
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

  // if (isLoading || !ImageData) {
  //   console.log('로딩: ', isLoading);
  //   console.log('데이터: ', ImageData);
  //   return <Spinner />;
  // }

  // console.log('이미지 리스트: ', ImageData);

  return (
    <>
      {ImageData.length !== 0 ? (
        <ImageLayout key={keyString}>{ImageData.map(imageCard)}</ImageLayout>
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
