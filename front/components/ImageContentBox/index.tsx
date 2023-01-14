import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ContentBox, ImageCard, ImageInfo, InfoItem } from './styles';

interface ImageData {
  id: number;
  imageUrl: string;
  create_date: string;
}

interface Props {
  data: ImageData;
  index: number;
  thisArr: ImageData[];
  observerRef: React.MutableRefObject<null>;
}

const ImageContentBox = ({ data, index, thisArr, observerRef }: Props) => {
  return (
    <ContentBox key={data.id} ref={thisArr.length - 1 === index ? observerRef : undefined}>
      <div>
        <Link to="#">
          <ImageCard>
            <img src={data.imageUrl} />
          </ImageCard>
          <ImageInfo>
            <InfoItem>
              <span>이미지 1</span>
            </InfoItem>
            <InfoItem>
              <span>{data.create_date}</span>
            </InfoItem>
          </ImageInfo>
        </Link>
      </div>
    </ContentBox>
  );
};

export default memo(ImageContentBox);
