import React, { useEffect, useMemo, useRef, useState } from 'react';

import { IconContext } from 'react-icons/lib';
import { BiUserPin } from 'react-icons/bi';
import { AiOutlineDownload } from 'react-icons/ai';

import { IDetailPictureInfo } from '@typing/client';
import { ImageSection, Wrapper } from './styles';
import ModalLayout from '../ModalLayout';

interface IImageBoxSize {
  modalWidth: number;
  modalHeight: number;
}

const DetailPictureInfo = ({
  imageInfo,
}: {
  imageInfo: IDetailPictureInfo;
}) => {
  const size = { width: 412, height: 550 };
  const [imageBoxSize, setImageBoxSize] = useState<IImageBoxSize>({
    modalWidth: 412,
    modalHeight: 550,
  });
  const imageBoxRef = useRef<HTMLDivElement>(null);

  const imageSizeCSS = useMemo(
    () =>
      (imageLink: string): React.CSSProperties => {
        const imageObj = new Image();
        imageObj.src = imageLink;

        const boxAspect = parseFloat((size.width / size.height).toFixed(3));
        const imageAspect = imageObj.width / imageObj.height;
        const { modalWidth, modalHeight } = imageBoxSize;

        if (boxAspect <= imageAspect) {
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
    [imageInfo, imageBoxSize],
  );

  useEffect(() => {
    if (imageBoxRef.current) {
      setImageBoxSize({
        modalWidth: imageBoxRef.current?.clientWidth,
        modalHeight: imageBoxRef.current?.clientHeight,
      });
    }
  }, []);

  return (
    <ModalLayout currentModal="detailPicture" size={size}>
      <Wrapper>
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
          </div>
          <div className="date_info">
            <div className="down_btn">
              <a href={imageInfo.data.link} download={imageInfo.data.fileName}>
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
        <ImageSection ref={imageBoxRef}>
          <img
            src={imageInfo.data.link}
            style={imageSizeCSS(imageInfo.data.link)}
            alt={`${imageInfo.index}번째 이미지`}
          />
        </ImageSection>
      </Wrapper>
    </ModalLayout>
  );
};

export default DetailPictureInfo;
