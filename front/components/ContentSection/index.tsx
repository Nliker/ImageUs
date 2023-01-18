import React, { CSSProperties, forwardRef, memo, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { IImageData } from '@typing/db';
import { getImageData, getMarkerFetcher, getRoomImageListFetcher, getUnreadImageList } from '@utils/roomDataFetcher';
import { Link, useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { ContentBox, ImageCard, ImageInfo, InfoItem, MainContainer, PostImage, Wrapper } from './styles';
import { imageLoadNumber } from '@hooks/swrStore';
import { AxiosResponse } from 'axios';
import useIntersect from '@hooks/useIntersect';
import Scrollbars from 'react-custom-scrollbars';
import ImageContentList from '@components/ImageContentList';
import { SyncLoader } from 'react-spinners';

interface ImageData {
  id: number;
  imageUrl: string;
  create_date: string | null;
  name: string | null;
}

interface Props {
  roomId?: string;
}

const spinnerCSS: CSSProperties = {
  display: 'block',
  margin: '1rem auto',
  textAlign: 'center',
};

const ContentSection = forwardRef<Scrollbars, Props>(({ roomId }, scrollRef) => {
  const [readStartNumber, setReadStartNumber] = useState(0);

  // 1시간 전에 업데이트 된 이미지는 방금 업데이트된 이미지에 들어간다.
  const [nowImage, setNowImage] = useState<ImageData[]>([]);
  const [todayImage, setTodayImage] = useState<ImageData[]>([]);
  const [previousImage, setPreviousImage] = useState<ImageData[]>([]);
  const [scrollHeight, setScrollHeight] = useState();

  const { mutate } = useSWRConfig();
  const {
    data: imageList,
    trigger: imageListTrigger,
    isMutating: imageListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist`, getRoomImageListFetcher);
  const { data: realTimeImageList, isLoading: realTimeImgLoading } = useSWR(
    `/room/${roomId}/unread-imagelist`,
    getUnreadImageList,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshInterval: 5000,
    },
  );

  const {
    data: realTimeImageData,
    trigger: realTimeImageDataTrigger,
    isMutating: realTimeImageLoading,
  } = useSWRMutation('/image-download/real', getImageData);

  const {
    data: nowImageData,
    trigger: nowImageDataTrigger,
    isMutating: nowImageLoading,
  } = useSWRMutation('/image-download/now', getImageData);
  const {
    data: todayImageData,
    trigger: todayImageDataTrigger,
    isMutating: todayImageLoading,
  } = useSWRMutation('/image-download/today', getImageData);
  const {
    data: previousImageData,
    trigger: previousImageDataTrigger,
    isMutating: previousImageLoading,
  } = useSWRMutation('/image-download/previous', getImageData);

  const markerAPI = `/room/${roomId}/marker`;
  const { data: markerNumber } = useSWR(markerAPI);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      /*

      데이터 fetching 중이 아니고 다음 로드할 데이터가 남아있다면 데이터를 부른다.(imageList 요청)

      */
      if (!imageListLoading && !todayImageLoading && !previousImageLoading && imageList?.loadDataLength === 12) {
        console.log('인터섹션 데이터 패칭 요청');
        imageListTrigger({ roomId, start: readStartNumber });
      }
    },
    {
      threshold: 0.5,
    },
  );
  const [observerRefPos, setObserverRefPos] = useState<number>();

  /*

   처음 마운트 됐을 때

  */

  useEffect(() => {
    console.log('컨텐트 섹션 처음 마운트 룸아이디', roomId);
    imageListTrigger({ roomId, start: readStartNumber });
  }, [roomId]);

  /*

    이미지 리스트 요청을 보내고 실제 이미지 데이터를 
    분할 요청해서 화면에 보여준다.

  */

  useEffect(() => {
    if (!imageList) return;

    if (readStartNumber === 0) {
      mutate(markerAPI, getMarkerFetcher(markerAPI));
    }
    setReadStartNumber((prev) => prev + 12);

    nowImageDataTrigger({ imagelist: imageList.nowImageList });
    todayImageDataTrigger({ imagelist: imageList.todayImageList });
    previousImageDataTrigger({ imagelist: imageList.previousImageList });

    // 인터섹션 옵저버 위치 변경
    if (imageList.previousImageList.length !== 0) {
      setObserverRefPos(2);
    } else if (imageList.todayImageList.length !== 0) {
      setObserverRefPos(1);
    } else {
      setObserverRefPos(0);
    }
  }, [imageList]);

  useEffect(() => {
    if (nowImageLoading || todayImageLoading || previousImageLoading) return;
    if (!nowImageData || !todayImageData || !previousImageData) return;

    console.log('nowImageData:', nowImageData);
    setNowImage((prev) => [...prev, ...nowImageData]);
    setTodayImage((prev) => [...prev, ...todayImageData]);
    setPreviousImage((prev) => [...prev, ...previousImageData]);
  }, [nowImageData, todayImageData, previousImageData]);

  /*

    실시간 이미지 업데이트

  */

  useEffect(() => {
    if (realTimeImgLoading || !realTimeImageList) return;

    realTimeImageDataTrigger({ imagelist: realTimeImageList });
  }, [realTimeImageList]);

  useEffect(() => {
    if (!realTimeImageData || realTimeImageLoading) return;
    console.log('realTImeImageData:', realTimeImageData);

    setNowImage((prev) => [...realTimeImageData, ...prev]);
  }, [realTimeImageData]);

  const observerConverter = useCallback(
    (sectionOrder: number) => {
      const value = sectionOrder === observerRefPos ? observerRef : undefined;
      return value;
    },
    [observerRefPos],
  );

  return (
    <Wrapper>
      <Scrollbars ref={scrollRef}>
        <MainContainer>
          <div>
            <div>
              <div>
                <span>방금 업데이트된 이미지</span>
              </div>
              <PostImage>
                <ImageContentList ImageData={nowImage} observerRef={observerConverter(0)} />
              </PostImage>
            </div>
            <div>
              <div>
                <span>오늘 업데이트된 이미지</span>
              </div>
              <PostImage>
                <ImageContentList ImageData={todayImage} observerRef={observerConverter(1)} />
              </PostImage>
            </div>
            <div>
              <div>
                <span>이전에 업데이트된 이미지</span>
              </div>
              <PostImage>
                <ImageContentList ImageData={previousImage} observerRef={observerConverter(2)} />
              </PostImage>
            </div>
            {(imageListLoading || todayImageLoading || previousImageLoading) && (
              <SyncLoader color="cornflowerblue" cssOverride={spinnerCSS} />
            )}
          </div>
        </MainContainer>
      </Scrollbars>
    </Wrapper>
  );
});
export default ContentSection;
