import React, { memo } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';

import { IImageData } from '@typing/client';
import { Spinner } from '@styles/Spinner';

import ImageContent from './ImageContent';
import { ImageLayout, NotImageData, Target } from './styles';
import { useCheckDeviceContext } from '@utils/CheckDeviceContext';

interface IImgSectionProps {
  imageList: IImageData[];
  imgListLoading: boolean;
  deleteImgFunc: (imageId: number) => Promise<void>;
}

interface IProps {
  imageSectionProps: IImgSectionProps;
  observerRef: React.MutableRefObject<null> | null;
}

const ImageSection = ({ imageSectionProps, observerRef }: IProps) => {
  const checkDeviceContext = useCheckDeviceContext();
  const { imageList, imgListLoading, deleteImgFunc } = imageSectionProps;

  return (
    <>
      {imageList.length !== 0 ? (
        <>
          <ImageLayout>
            {imageList.map((image: IImageData, index: number) => (
              <ImageContent
                key={image.id}
                data={image}
                index={index}
                deleteImgFunc={deleteImgFunc}
                isMobile={checkDeviceContext.isMobile}
              />
            ))}
          </ImageLayout>
          <Target ref={observerRef} />
          {imgListLoading && <Spinner />}
        </>
      ) : (
        <NotImageData>
          <IconContext.Provider
            value={{
              size: '30%',
              style: { display: 'inline-block', maxWidth: '250px' },
            }}
          >
            <FcRemoveImage />
          </IconContext.Provider>
          <span>이미지가 없습니다.</span>
        </NotImageData>
      )}
    </>
  );
};

export default memo(ImageSection);
