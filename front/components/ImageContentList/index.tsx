import ImageContentBox from '@components/ImageContentBox';
import { CImageData } from '@typing/client';
import React, { memo } from 'react';

interface Props {
  ImageData: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

const ImageContentList = ({ ImageData, observerRef }: Props) => {
  const imageCard = (data: CImageData, index: number, thisArr: CImageData[]) => (
    <ImageContentBox key={data.id} data={data} index={index} thisArr={thisArr} observerRef={observerRef} />
  );
  return <>{ImageData.map(imageCard)}</>;
};

export default memo(ImageContentList);
