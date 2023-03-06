import React, { memo } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import ImageContentBox from '@components/ImageContentBox';
import { CImageData } from '@typing/client';
import { ImageLayout, NotImageData } from './styles';

interface Props {
  ImageData: CImageData[];
  sectionName?: string;
  observerRef?: React.MutableRefObject<null>;
}

const ImageContentList = ({ ImageData, observerRef, sectionName }: Props) => {
  const imageCard = (
    data: CImageData,
    index: number,
    thisArr: CImageData[],
  ) => (
    <ImageContentBox
      key={data.id}
      sectionName={sectionName}
      data={data}
      index={index}
      thisArr={thisArr}
      observerRef={observerRef}
    />
  );
  return (
    <>
      {ImageData.length !== 0 ? (
        <ImageLayout>{ImageData.map(imageCard)}</ImageLayout>
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

export default memo(ImageContentList);
