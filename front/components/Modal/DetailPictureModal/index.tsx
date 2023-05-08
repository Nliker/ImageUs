import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IconContext } from 'react-icons/lib';
import { BiUserPin } from 'react-icons/bi';

import { ImageSection, Wrapper } from './styles';
import { AiOutlineDownload } from 'react-icons/ai';
import { IDetailPictureInfo } from '@typing/client';
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
  // const getCurrentModalSize = useCallback(() => {
  //   const modalHeight = (window.innerHeight * 0.7).toFixed(3);
  //   const modalWidth = modalHeight;

  //   return {
  //     modalWidth: parseInt(modalWidth),
  //     modalHeight: parseInt(modalHeight),
  //   };
  // }, [window.innerHeight]);
  // const [modalSize, setModalSize] = useState(getCurrentModalSize());

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   const handleResizeModal = () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       const { modalWidth, modalHeight } = getCurrentModalSize();

  //       setModalSize({
  //         modalWidth,
  //         modalHeight,
  //       });
  //     }, 300);
  //   };

  //   window.addEventListener('resize', handleResizeModal);

  //   return () => {
  //     window.removeEventListener('resize', handleResizeModal);
  //   };
  // }, []);

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
        // const modalWidth = imageBoxRef.current?.clientWidth ?? size.width;
        // const modalHeight = imageBoxRef.current?.clientHeight ?? size.height;

        if (boxAspect <= imageAspect) {
          // const modalWidth = size.width;

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
          // const modalHeight = size.height;

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
      console.log(
        '정보',
        imageBoxRef.current,
        imageBoxRef.current?.clientWidth,
        imageBoxRef.current?.clientHeight,
      );

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
            {/* <span className="writer">{imageInfo.data.user_name}</span> */}
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
