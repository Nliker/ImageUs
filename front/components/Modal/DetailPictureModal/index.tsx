import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { IconContext } from 'react-icons/lib';
import { BiUserPin } from 'react-icons/bi';

import { ImageSection, Wrapper } from './styles';
import { AiOutlineDownload } from 'react-icons/ai';

const DetailPictureInfo = () => {
  const { data: imageInfo } = useSWR('detailImageInfo');

  const getCurrentModalSize = useCallback(() => {
    const modalHeight = (window.innerHeight * 0.7).toFixed(3);
    const modalWidth = modalHeight;

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
    () =>
      (imageLink: string): React.CSSProperties => {
        const imageObj = new Image();
        imageObj.src = imageLink;

        const boxAspect = window.innerWidth < 600 ? 0.9375 : 1.25;
        const imageAspect = imageObj.width / imageObj.height;

        if (boxAspect <= imageAspect) {
          const modalWidth =
            window.innerWidth < 600 ? 300 : modalSize.modalWidth;

          if (modalWidth > imageObj.width) {
            return {
              width: `${imageObj.width}px`,
              objectFit: 'contain',
            };
          } else {
            return {
              width: '100%',
              objectFit: 'contain',
            };
          }
        } else {
          const modalHeight =
            window.innerWidth < 600 ? 400 : modalSize.modalHeight;

          if (modalHeight > imageObj.height) {
            return {
              width: 'auto',
              height: `${imageObj.height}px`,
            };
          } else {
            return {
              width: 'auto',
              height: '100%',
            };
          }
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
          <div className="down_btn">
            <a href={imageInfo?.data.link} download={imageInfo?.data.fileName}>
              <IconContext.Provider
                value={{
                  size: '100%',
                  style: { display: 'inline-block', color: 'black' },
                }}
              >
                <AiOutlineDownload />
              </IconContext.Provider>
            </a>
          </div>
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
