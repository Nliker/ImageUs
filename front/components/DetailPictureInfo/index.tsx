import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { IconContext } from 'react-icons/lib';
import { BiUserPin } from 'react-icons/bi';

import { ImageSection, Wrapper } from './styles';

const DetailPictureInfo = () => {
  const { data: imageInfo } = useSWR('detailImageInfo');

  const getCurrentModalSize = useCallback(() => {
    const modalHeight = (window.innerHeight * 0.7).toFixed(3);
    const modalWidth = Number.parseFloat(modalHeight).toFixed(3);

    return {
      modalWidth,
      modalHeight,
    };
  }, [window.innerHeight]);
  const [modalSize, setModalSize] = useState(getCurrentModalSize());

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResizeModal = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const { modalWidth, modalHeight } = getCurrentModalSize();

        setModalSize({
          modalWidth,
          modalHeight,
        });
      }, 300);
    };

    window.addEventListener('resize', handleResizeModal);

    return () => {
      window.removeEventListener('resize', handleResizeModal);
    };
  }, []);

  const imageSizeCSS = useMemo(
    () => (imageLink: string) => {
      const imageObj = new Image();
      imageObj.src = imageLink;

      const boxAspect = window.innerWidth <= 600 ? 1.0714 : 1.4285;
      const imageAspect = imageObj.width / imageObj.height;

      if (boxAspect <= imageAspect) {
        return {
          width: 'auto',
          height: '100%',
        };
      } else {
        return {
          width: '100%',
          height: 'auto',
        };
      }
    },
    [imageInfo],
  );

  if (!imageInfo.data) {
    alert('잘못된 이미지 정보입니다.');
    return null;
  }

  return (
    <Wrapper modalSize={modalSize}>
      <div className="head_info">
        <div className="name_info">
          <IconContext.Provider
            value={{
              size: '30px',
              style: { display: 'inline-block' },
            }}
          >
            <BiUserPin />
          </IconContext.Provider>
          <span className="writer">{imageInfo.data.user_name}</span>
        </div>
        <div className="date_info">
          <span>일시: {imageInfo.data.created_at}</span>
        </div>
      </div>
      <ImageSection>
        <img
          src={imageInfo.data.link}
          style={imageSizeCSS(imageInfo.data.link)}
          alt={`${imageInfo.index}번째 이미지`}
        />
      </ImageSection>
    </Wrapper>
  );
};

export default DetailPictureInfo;
