import ImageContentBox from '@components/ImageContentBox';
import { CImageData } from '@typing/client';
import React, { memo } from 'react';
import { ImageLayout } from './styles';

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
  return <ImageLayout>{ImageData.map(imageCard)}</ImageLayout>;
};

export default memo(ImageContentList);
