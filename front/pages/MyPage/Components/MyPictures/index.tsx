import React, { memo } from 'react';

import ImageContentList from '@pages/ImageRoom/Components/ImageContentList';
import { CImageData } from '@typing/client';
import { Wrapper } from './styles';

interface Props {
  imageList?: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

const MyPictures = ({ imageList, observerRef }: Props) => {
  return !imageList ? (
    <div>로딩중..</div>
  ) : (
    <Wrapper>
      <ImageContentList ImageData={imageList} observerRef={observerRef} />
    </Wrapper>
  );
};

export default memo(MyPictures);
