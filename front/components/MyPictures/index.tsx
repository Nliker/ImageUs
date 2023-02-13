import ImageContentList from '@components/ImageContentList';
import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';
import React, { memo } from 'react';
import { Wrapper } from './styles';

interface Props {
  imageList?: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

// Route를 활용해서 만든 컴포넌트
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
