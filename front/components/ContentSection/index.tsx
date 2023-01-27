import React, {
  CSSProperties,
  forwardRef,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  getImageData,
  getMarkerFetcher,
  getRoomImageListFetcher,
  getUnreadImageList,
} from '@utils/roomDataFetcher';
import { Link, useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  ContentBox,
  ImageCard,
  ImageInfo,
  InfoItem,
  MainContainer,
  Wrapper,
} from './styles';
import { imageLoadNumber } from '@hooks/swrStore';
import { AxiosResponse } from 'axios';
import useIntersect from '@hooks/useIntersect';
import Scrollbars from 'react-custom-scrollbars';
import ImageContentList from '@components/ImageContentList';
import { SyncLoader } from 'react-spinners';
import { CImageData } from '@typing/client';
import { DImageData } from '@typing/db';

interface Props {
  roomId?: string;
}

interface ImageList {
  nowImageList: DImageData[];
  todayImageList: DImageData[];
  previousImageList: DImageData[];
  loadDataLength: any;
}

const spinnerCSS: CSSProperties = {
  display: 'block',
  margin: '1rem auto',
  textAlign: 'center',
};

const ContentSection = forwardRef<Scrollbars, Props>(
  ({ roomId }, scrollRef) => {
    const [readStartNumber, setReadStartNumber] = useState(0);
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
      data: getImage,
      trigger: getImageTrigger,
      isMutating: getImageLoading,
    } = useSWRMutation('/image-download', getImageData);

    const { data: nowImage, mutate: mutateNowImage } = useSWR<CImageData[]>(
      `/image/${roomId}/now`,
      {
        fallbackData: [],
      },
    );
    const { data: todayImage, mutate: mutateTodayImage } = useSWR<CImageData[]>(
      `/image/${roomId}/today`,
      {
        fallbackData: [],
      },
    );
    const { data: previousImage, mutate: mutatePrevImage } = useSWR<
      CImageData[]
    >(`/image/${roomId}/previous`, {
      fallbackData: [],
    });

    const markerAPI = `/room/${roomId}/marker`;
    const { data: markerNumber } = useSWR(markerAPI);

    const [observerRefPos, setObserverRefPos] = useState<number>();
    const observerRef = useIntersect(
      async (entry, observer) => {
        observer.unobserve(entry.target);
        /*

      데이터 fetching 중이 아니고 다음 로드할 데이터가 남아있다면 데이터를 부른다.(imageList 요청)

      */
        if (
          !imageListLoading &&
          !getImageLoading &&
          imageList?.loadDataLength === 12
        ) {
          console.log('인터섹션 데이터 패칭 요청, 옵저버:', observerRefPos);
          imageListTrigger({ roomId, start: readStartNumber });
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (!nowImage || !todayImage || !previousImage) {
      return <div>로딩중...</div>;
    }

    /*

   방에 처음 들어가서 마운트 됐을 때

  */

    useEffect(() => {
      console.log('컨텐트 섹션 처음 마운트 룸아이디', roomId);
      imageListTrigger({ roomId, start: readStartNumber });

      return () => {
        mutateNowImage([], false);
        mutateTodayImage([], false);
        mutatePrevImage([], false);
      };
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

      fetchImages(imageList);

      // 인터섹션 옵저버 위치 변경
      if (imageList.previousImageList.length !== 0) {
        setObserverRefPos(2);
      } else if (imageList.todayImageList.length !== 0) {
        setObserverRefPos(1);
      } else {
        setObserverRefPos(0);
      }
    }, [imageList]);

    const fetchImages = async (imageList: ImageList) => {
      if (imageList.nowImageList.length !== 0) {
        getImageTrigger(imageList.nowImageList).then((newImage) => {
          if (newImage) mutateNowImage([...nowImage, ...newImage]);
        });
      }
      if (imageList.todayImageList.length !== 0) {
        getImageTrigger(imageList.todayImageList).then((newImage) => {
          if (newImage) mutateTodayImage([...todayImage, ...newImage]);
        });
      }
      if (imageList.previousImageList.length !== 0) {
        getImageTrigger(imageList.previousImageList).then((newImage) => {
          if (newImage) mutatePrevImage([...previousImage, ...newImage]);
        });
      }
    };

    /*

    실시간 이미지 업데이트

  */

    useEffect(() => {
      if (realTimeImgLoading || !realTimeImageList) return;

      getImageTrigger(realTimeImageList).then((newImage) => {
        if (newImage) mutateNowImage([...newImage, ...nowImage]);
      });
    }, [realTimeImageList]);

    const observerConverter = useCallback(
      (sectionOrder: number) => {
        const value = sectionOrder === observerRefPos ? observerRef : undefined;
        return value;
      },
      [observerRefPos],
    );

    // console.log('이미지 리스트: ', imageList);
    // console.log('컨텐트 섹션: ', previousImage);

    return (
      <Wrapper>
        <Scrollbars ref={scrollRef}>
          <MainContainer>
            <div>
              <div>
                <div>
                  <span>방금 업데이트된 이미지</span>
                </div>
                <ImageContentList
                  ImageData={nowImage}
                  sectionName={'now'}
                  observerRef={observerConverter(0)}
                />
              </div>
              <div>
                <div>
                  <span>오늘 업데이트된 이미지</span>
                </div>
                <ImageContentList
                  ImageData={todayImage}
                  sectionName={'today'}
                  observerRef={observerConverter(1)}
                />
              </div>
              <div>
                <div>
                  <span>이전에 업데이트된 이미지</span>
                </div>
                <ImageContentList
                  ImageData={previousImage}
                  sectionName={'previous'}
                  observerRef={observerConverter(2)}
                />
              </div>
              {(imageListLoading || getImageLoading) && (
                <SyncLoader color="cornflowerblue" cssOverride={spinnerCSS} />
              )}
            </div>
          </MainContainer>
        </Scrollbars>
      </Wrapper>
    );
  },
);
export default ContentSection;
