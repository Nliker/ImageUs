import { IImageData } from '@typing/db';
import React from 'react';
import { Wrapper } from './styles';

interface ImageData {
  id: number;
  imageUrl: string;
}

// Route를 활용해서 만든 컴포넌트
const MyPictures = ({ imageList }: { imageList?: Array<ImageData | null> }) => {
  return !imageList ? (
    <div>로딩중..</div>
  ) : (
    <Wrapper>
      <ul>
        {imageList &&
          imageList.map((image) => (
            <li key={image?.id}>
              <div>
                <img src={image?.imageUrl} alt={`테스트 요청 alt`} />
              </div>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};

export default MyPictures;
