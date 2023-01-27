import React from 'react';
import { ImageSection, InfoSection, Wrapper } from './styles';
import useSWR from 'swr';

const DetailPictureInfo = () => {
  const { data: imageInfo } = useSWR('detailImageInfo');

  if (!imageInfo.data) {
    alert('잘못된 이미지 정보입니다.');
    return null;
  }

  return (
    <Wrapper>
      <ImageSection>
        <img src={imageInfo.data.link} alt={`${imageInfo.index}번째 이미지`} />
      </ImageSection>
      <InfoSection>
        <p>작성자: {imageInfo.data.user_name}</p>
        <p>일시: {imageInfo.data.created_at}</p>
        <p>글귀</p>
      </InfoSection>
    </Wrapper>
  );
};

export default DetailPictureInfo;
