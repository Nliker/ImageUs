import React, { memo, useEffect, useRef } from 'react';

import { CImageData } from '@typing/client';
import { ImageLayout, NotImageData, Wrapper } from './styles';
import useIntersect from '@hooks/useIntersect';
import Spinner from '@styles/Spinner';
import { IconContext } from 'react-icons/lib';
import { FcRemoveImage } from 'react-icons/fc';
import ImageContent from './ImageContent';
import useUserImageData from '@hooks/useUserImgData';

interface IImageCard {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

const MyPictures = () => {
  const userId = sessionStorage.getItem('user_id');

  const { userImageList, userImgLoading, loadUserImage, clearUserImageList } =
    useUserImageData(userId);

  const fetchingData = useRef(false);
  const imgLoadEnd = useRef(false);
  const readStartNumber = useRef(0);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);

      if (fetchingData.current || imgLoadEnd.current) {
        return;
      }
      fetchingData.current = true;

      await fetchData();

      fetchingData.current = false;
    },
    {
      threshold: 0.5,
    },
  );

  const fetchData = async () => {
    imgLoadEnd.current = await loadUserImage({
      readStartNumber: readStartNumber.current,
    });
    if (!imgLoadEnd.current) {
      readStartNumber.current += 12;
    }

    console.log('fetchData', imgLoadEnd.current);
  };

  useEffect(() => {
    readStartNumber.current = 0;
    imgLoadEnd.current = false;

    fetchData();

    return () => {
      clearUserImageList();
    };
  }, []);

  const ImageCard = memo(
    ({ data, index, thisArr, observerRef }: IImageCard) => (
      <ImageContent
        data={data}
        index={index}
        thisArr={thisArr}
        observerRef={observerRef}
      />
    ),
  );

  console.log(userImageList);

  return (
    <Wrapper>
      {!userImageList ? (
        <Spinner />
      ) : userImageList.length !== 0 ? (
        <>
          <ImageLayout>
            {userImageList.map(
              (image: CImageData, index: number, thisArr: CImageData[]) => (
                <ImageCard
                  key={image.id}
                  data={image}
                  index={index}
                  thisArr={thisArr}
                  observerRef={observerRef}
                />
              ),
            )}
          </ImageLayout>
          {userImgLoading && <Spinner />}
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
    </Wrapper>
  );
};

export default memo(MyPictures);
