import ImageContentBox from '@components/ImageContentBox';
import React, { memo } from 'react';

interface ImageData {
  id: number;
  imageUrl: string;
  create_date: string;
}

interface Props {
  allImageData: Array<ImageData>;
  observerRef: React.MutableRefObject<null>;
}

const ImageContentList = ({ allImageData, observerRef }: Props) => {
  const imageCard = (data: ImageData, index: number, thisArr: ImageData[]) => (
    <ImageContentBox key={data.id} data={data} index={index} thisArr={thisArr} observerRef={observerRef} />
  );
  return <>{allImageData.map(imageCard)}</>;
};

export default memo(ImageContentList);