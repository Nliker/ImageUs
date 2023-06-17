import React, { useEffect, useRef } from 'react';

import { IconContext } from 'react-icons';
import { FcRemoveImage } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { Button } from '@styles/Button';
import { Spinner } from '@styles/Spinner';
import useUserImageData from '@hooks/useUserImgData';
import { IImageData } from '@typing/client';
import useIntersect from '@hooks/useIntersect';
import useModal from '@hooks/useModal';
import { ImageLayout } from '@pages/ImageRoom/Component/ImageSection/styles';
import ImageContent from '@components/ImageContent';
import { useDeviceMode } from '@hooks/useDeviceMode';
import { getErrorMessage } from '@utils/getErrorMessage';
import { ImageContainer, NotImageData, Target } from './styles';

function MyPicture({ userId }: { userId: number }) {
  const { showUploadImgModal } = useModal();
  const checkDeviceContext = useDeviceMode();
  const {
    initialLoading,
    userImgLoading,
    userImageList,
    imageLoadEnd,
    userImgListError,
    loadImage,
    deleteUserImage,
    uploadUserImage,
    clearUserImageList,
  } = useUserImageData(userId);

  const loadStartNum = useRef(0);
  const effectRan = useRef(false);
  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (userImgLoading || imageLoadEnd) {
        return;
      }

      loadImage(loadStartNum.current);
      loadStartNum.current += 12;
    },
    {
      threshold: 0.5,
    },
  );

  const onClickUploadModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showUploadImgModal({ executeFunc: uploadUserImage });
  };

  const deleteImageFunc = async (imageId: number) =>
    await deleteUserImage(imageId);

  useEffect(() => {
    if (effectRan.current === false) {
      loadImage(loadStartNum.current);
      loadStartNum.current += 12;
    }

    return () => {
      if (effectRan.current) loadStartNum.current = 0;
      effectRan.current = true;
      clearUserImageList();
    };
  }, []);

  if (userImgListError) {
    if (userImgListError?.name === 'AuthError') {
      throw userImgListError;
    } else {
      const message = getErrorMessage(userImgListError);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <div className="upload_image">
        <Button onClick={onClickUploadModal}>이미지 업로드하기</Button>
      </div>
      <ImageContainer>
        {initialLoading ? (
          <Spinner />
        ) : (
          <div className="content_box">
            {userImageList.length !== 0 ? (
              <>
                <ImageLayout>
                  {userImageList.map((image: IImageData, index: number) => (
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
                {userImgLoading && <Spinner />}
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
          </div>
        )}
      </ImageContainer>
    </>
  );
}

export default MyPicture;
