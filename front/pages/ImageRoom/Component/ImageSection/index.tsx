import React, { memo, useEffect, useRef } from 'react';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';
import { SlCloudUpload } from 'react-icons/sl';
import { toast } from 'react-toastify';

import { IImageData, ISelectTerm } from '@typing/client';
import { Spinner } from '@styles/Spinner';
import { useDeviceMode } from '@hooks/useDeviceMode';
import useRoomImgData from '@hooks/useRoomImgData';
import useIntersect from '@hooks/useIntersect';
import { getErrorMessage } from '@utils/getErrorMessage';
import useModal from '@hooks/useModal';
import ImageContent from '@components/ImageContent';
import { ImageLayout, NotImageData, Target, UploadButton } from './styles';

interface IProps {
  roomId: string;
  filteringData: {
    isFilterMode: boolean;
    filterSelectTerm: ISelectTerm;
  };
}

const ImageSection = ({ roomId, filteringData }: IProps) => {
  const checkDeviceContext = useDeviceMode();
  const { showUploadImgModal } = useModal();

  const {
    initialLoading,
    roomImageList,
    roomImgLoading,
    imageLoadEnd,
    roomImgListError,
    loadImage,
    uploadRoomImage,
    deleteRoomImage,
    clearRoomImageData,
  } = useRoomImgData(roomId, filteringData);

  const loadStartNum = useRef(0);
  const effectRan = useRef(false);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (roomImgLoading || imageLoadEnd) {
        return;
      }
      loadImage(loadStartNum.current);
      loadStartNum.current += 12;
    },
    {
      threshold: 0.5,
    },
  );

  const onClickUploadModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    showUploadImgModal({ executeFunc: uploadRoomImage });
  };

  const deleteImageFunc = async (imageId: number) =>
    await deleteRoomImage(imageId);

  useEffect(() => {
    if (effectRan.current) {
      loadImage(loadStartNum.current);
      loadStartNum.current += 12;
    }

    return () => {
      loadStartNum.current = 0;
      effectRan.current = true;
      clearRoomImageData();
    };
  }, [roomId, filteringData.filterSelectTerm]);

  if (roomImgListError) {
    if (roomImgListError?.name === 'AuthError') {
      throw roomImgListError;
    } else {
      const message = getErrorMessage(roomImgListError);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  if (initialLoading) return <Spinner />;

  return (
    <div className="content_box">
      {roomImageList.length !== 0 ? (
        <>
          <ImageLayout>
            {roomImageList.map((image: IImageData, index: number) => (
              <ImageContent
                key={image.id}
                data={image}
                index={index}
                deleteImgFunc={deleteImageFunc}
                isMobile={checkDeviceContext.isMobile}
              />
            ))}
          </ImageLayout>
          <Target ref={observerRef} />
          {roomImgLoading && <Spinner />}
        </>
      ) : (
        <NotImageData>
          <IconContext.Provider
            value={{
              size: '30%',
              style: {
                display: 'inline-block',
                minWidth: '100px',
                maxWidth: '200px',
              },
            }}
          >
            <FcRemoveImage />
          </IconContext.Provider>
          <span>이미지가 없습니다.</span>
        </NotImageData>
      )}
      <UploadButton onClick={onClickUploadModal}>
        <IconContext.Provider
          value={{
            size: '40px',
            style: { display: 'inline-block' },
          }}
        >
          <SlCloudUpload />
        </IconContext.Provider>
        <span>업로드</span>
      </UploadButton>
    </div>
  );
};

export default memo(ImageSection);
