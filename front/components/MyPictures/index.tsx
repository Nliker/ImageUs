import { IImageData } from '@typing/db';
import React from 'react';
import { Wrapper } from './styles';

// const dummyImages = [
//   { id: 1, name: 'first_image', url: 'image_test.png' },
//   { id: 2, name: 'second_image', url: 'image_test2.jpg' },
//   { id: 3, name: 'third_image', url: 'image_test3.jpg' },
//   { id: 4, name: 'first_image', url: 'image_test.png' },
//   { id: 5, name: 'second_image', url: 'image_test2.jpg' },
//   { id: 6, name: 'third_image', url: 'image_test3.jpg' },
// ];

// Route를 활용해서 만든 컴포넌트
const MyPictures = ({ imageList }: {imageList?: Array<IImageData>}) => {
  return (
    <Wrapper>
      <ul>
        {imageList && imageList.map((image) => (
          <li key={image.id}>
            <div>
              <img src={image.link} alt={`테스트 요청 alt`} />
            </div>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default MyPictures;
