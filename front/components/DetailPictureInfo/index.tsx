import React from 'react';
import { ImageSection, InfoSection, Wrapper } from './styles';
import useSWR from 'swr';
import { IconContext } from 'react-icons/lib';
import { RiMapPinUserLine } from 'react-icons/ri';

const DetailPictureInfo = () => {
  const { data: imageInfo } = useSWR('detailImageInfo');

  if (!imageInfo.data) {
    alert('잘못된 이미지 정보입니다.');
    return null;
  }

  return (
    <Wrapper>
      <div className="head_info">
        <div className="name_info">
          <IconContext.Provider
            value={{
              size: '10%',
              style: { display: 'inline-block' },
            }}
          >
            <RiMapPinUserLine />
          </IconContext.Provider>
          <span className="writer">{imageInfo.data.user_name}</span>
        </div>
        <div className="date_info">
          <span>일시: {imageInfo.data.created_at}</span>
        </div>
      </div>
      <ImageSection>
        <img src={imageInfo.data.link} alt={`${imageInfo.index}번째 이미지`} />
      </ImageSection>
    </Wrapper>
  );
};

export default DetailPictureInfo;
