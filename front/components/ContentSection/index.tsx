import React, { forwardRef, memo, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { IImageData } from '@typing/db';
import { getImageData, getMarkerFetcher, getRoomImageListFetcher } from '@utils/roomDataFetcher';
import { Link, useParams } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { ContentBox, ImageCard, ImageInfo, InfoItem, MainContainer, PostImage, Wrapper } from './styles';
import { imageLoadNumber } from '@hooks/swrStore';
import { AxiosResponse } from 'axios';
import useIntersect from '@hooks/useIntersect';
import Scrollbars from 'react-custom-scrollbars';
import ImageContentList from '@components/ImageContentList';

interface ImageData {
  id: number;
  imageUrl: string;
  create_date: string;
}

interface Props {
  roomId?: string;
}

const ContentSection = forwardRef<Scrollbars, Props>(({ roomId }, scrollRef) => {
  const [readStartNumber, setReadStartNumber] = useState(0);
  const [allImageData, setAllImageData] = useState<Array<ImageData>>([]);
  const [scrollHeight, setScrollHeight] = useState();

  const {
    data: imageList,
    trigger: imageListTrigger,
    isMutating: imageListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist`, getRoomImageListFetcher);
  const {
    data: imageDataList,
    trigger: imageDataTrigger,
    isMutating: imageDataLoading,
  } = useSWRMutation('/image-download', getImageData);
  const { data: markerNumber, trigger: markerTrigger } = useSWRMutation(`/room/${roomId}/marker`, getMarkerFetcher);

  const observerRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);

    // 데이터 fetching 중이 아니고 다음 로드할 데이터가 남아있다면 데이터를 부른다.(imageList 요청)
    if (!imageListLoading && !imageDataLoading && imageList?.imagelist.length === 12) {
      console.log('인터섹션 데이터 패칭 요청');
      imageListTrigger({ roomId, start: readStartNumber });
    }
  });

  // 처음 마운트 됐을 때
  useEffect(() => {
    console.log('컨텐트 섹션 처음 마운트 룸아이디', roomId);
    imageListTrigger({ roomId, start: readStartNumber });
    markerTrigger();
  }, [roomId]);

  // 스크롤이 일어날 때 imageList 요청을 보내서 다음 사진을 받고
  // 이미지 로드 시작번호를 업데이트 한다.
  useEffect(() => {
    if (!imageList) return;
    setReadStartNumber((prev) => prev + 12);
    imageDataTrigger(imageList);
  }, [imageList]);

  // 전달받은 이미지 정보를 allImageData에 업데이트
  useEffect(() => {
    if (!imageDataList) return;
    setAllImageData((prev) => [...prev, ...imageDataList.imgData]);
  }, [imageDataList]);

  // useEffect(() => {
  //   //  패칭 후에 스크롤을 현재 위치로 유지시킨다.
  //   const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
  //   console.log(current.getScrollHeight());
  //   if (current) {
  //     current.scrollTop(current.getScrollHeight());
  //   }
  // }, [allImageData]);

  // const handleIntersectTargetRef = useCallback(() => {

  // }, []);
  return (
    <Wrapper>
      <Scrollbars ref={scrollRef}>
        <MainContainer>
          <div>
            {/* {imageDataList?.nextImgData.length !== 0 && (
                <div>
                  <div>
                    <span>최신 업로드 이미지</span>
                  </div>
                  <div>
                    {imageDataList?.nextImgData.map((data) => {
                      return (
                        <ContentBox key={data.id}>
                          <div>
                            <Link to="#">
                              <ImageCard>
                                <img src={data.imageUrl} />
                              </ImageCard>
                              <ImageInfo>
                                <InfoItem>
                                  <span>이미지 1</span>
                                </InfoItem>
                                <InfoItem>
                                  <span>{data.create_date}</span>
                                </InfoItem>
                              </ImageInfo>
                            </Link>
                          </div>
                        </ContentBox>
                      );
                    })}
                  </div>
                </div>
              )} */}
            <div>
              <div>
                <span>게시된 이미지</span>
              </div>
              <PostImage>
                {imageDataList?.imgData.length === 0 ? (
                  <div>
                    <span>게시된 이미지가 없습니다.</span>
                  </div>
                ) : (
                  <ImageContentList allImageData={allImageData} observerRef={observerRef} />
                )}
              </PostImage>
            </div>
            {/* allImageData.map((data, index, thisArr) => {
                return (
                  <ContentBox key={data.id} ref={thisArr.length - 1 === index ? observerRef : undefined}>
                    <div>
                      <Link to="#">
                        <ImageCard>
                          <img src={data.imageUrl} />
                        </ImageCard>
                        <ImageInfo>
                          <InfoItem>
                            <span>이미지 1</span>
                          </InfoItem>
                          <InfoItem>
                            <span>{data.create_date}</span>
                          </InfoItem>
                        </ImageInfo>
                      </Link>
                    </div>
                  </ContentBox>
                );
              }) */}
            {/* <div>
                <div>
                  <span>삭제된 이미지 목록</span>
                </div>
                <div>
                  {imageDataList?.deleteImgData.map((data, i) => {
                    // console.log(data);
                    return (
                      <ContentBox key={data.id}>
                        <div>{i}번째 이미지는 삭제되었습니다..</div>
                      </ContentBox>
                    );
                  })}
                </div>
              </div> */}
          </div>
        </MainContainer>
      </Scrollbars>
    </Wrapper>
  );
});
export default ContentSection;
