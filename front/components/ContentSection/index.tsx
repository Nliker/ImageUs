import React, { memo, useEffect, useState } from 'react';
import { IImageData } from '@typing/db';
import { getImageData, getRoomImageListFetcher } from '@utils/roomDataFetcher';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { ContentBox, ImageCard, ImageInfo, InfoItem, MainContainer, Wrapper } from './styles';
import { imageLoadNumber } from '@hooks/swrStore';
import { AxiosResponse } from 'axios';

/*
    grid로 격자 형식으로 각 div에 너비와 높이를 똑같이 지정해서 보여준다.
    각 row마다 div로 감싸져서 전체 이미지 데이터를 받아온 후 가공해서 렌더링한다.
    전체 이미지는 60개, 80개 등으로 받아온 후에 스크롤이 내려가면 다시 백엔드에 요청을 보내는
    인피니티 스크롤링을 고려한다.
*/

interface Props {
  onShowModal: (e: any) => void;
}

interface ImageType {
  id: number;
  imageUrl: string | null;
}

interface b64Image {
  id: number;
  imageData: string | null;
}

const ContentSection = memo(({ roomId }: { roomId: string | undefined }) => {
  // const { roomId } = useParams<{ roomId?: string }>();
  // const { data: roomId } = useSWR('roomId');
  const { start } = imageLoadNumber();
  const {
    data: imageList,
    mutate: imageListTrigger,
    isLoading,
  } = useSWR(['imagelist', roomId, start], getRoomImageListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: imageDataList, trigger } = useSWRMutation('/image-download', getImageData);

  // 스크롤이 일어날 때 imageList 요청을 보내서 다음 사진을 받고
  // mutate(key, start + 개수 + 1, true)로 이미지 로드 시작번호를 업데이트 한다.

  console.log(imageList);
  console.log(imageDataList);

  useEffect(() => {
    if (!imageList) return;
    trigger(imageList);
  }, [imageList]);

  // useEffect(() => {
  //   console.log(imageDataList);
  //   // if (b64ImageList.length === 0) return;
  //   if (!imageDataList) return;
  //   setB64ImageList(() => {
  //     // if (!imageDataList) return [...prev];
  //     const newData = imageDataList.map((data) => {
  //       if (!data.imageData) return { ...data };
  //       // const b64image = btoa(unescape(encodeURIComponent(data.imageData.data)));
  //       // console.log(b64image);

  //       return { ...data, imageUrl: b64image };
  //     });
  //     // console.log(newData);
  //     return [...newData];
  //   });
  // }, [imageDataList]);
  // console.log(roomId, '컨텐츠 섹션');
  // console.log(imageList, '테스트', roomId);
  // // 전체 이미지 정보
  // const { mutate: imageInfoMutate } = useSWR('imageInfo');
  // // 클릭한 이미지 정보
  // const { mutate: imageModalMutate } = useSWR('imageModalState');
  // const { data: showModalData, mutate: showModalMutate } = useSWR('showModalState');

  // useEffect(() => {
  //   imageInfoMutate(dummyImages, false);
  // }, []);

  // const onShowImageModal = (image: ImageType) => () => {
  //   imageModalMutate({
  //     clickImageId: image.id,
  //     clickImageUrl: image.url,
  //     clickImageName: image.name,
  //   }, false);
  //   showModalMutate({
  //     ...showModalData,
  //     image: true
  //   }, false);
  // };
  return (
    <Wrapper>
      <MainContainer>
        {!roomId ? (
          <div>메인화면입니다.</div>
        ) : isLoading && !imageDataList ? (
          <div>로딩중입니다..</div>
        ) : (
          <div>
            <div>
              <span>최신 업로드 이미지</span>
            </div>
            {imageDataList?.nextImgData.map((data) => {
              // console.log(data);
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
                          <span>2022/ 11/ 25</span>
                        </InfoItem>
                      </ImageInfo>
                    </Link>
                  </div>
                </ContentBox>
              );
            })}
            <div>
              <span>게시된 이미지</span>
            </div>
            {imageDataList?.prevImgData.map((data) => {
              // console.log(data);
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
                          <span>2022/ 11/ 25</span>
                        </InfoItem>
                      </ImageInfo>
                    </Link>
                  </div>
                </ContentBox>
              );
            })}
            <div>
              <span>삭제된 이미지 목록</span>
            </div>
            {imageDataList?.deleteImgData.map((data, i) => {
              // console.log(data);
              return (
                <ContentBox key={data.id}>
                  <div>{i}번째 이미지는 삭제되었습니다..</div>
                </ContentBox>
              );
            })}
          </div>
        )}
      </MainContainer>
    </Wrapper>
  );
});

export default ContentSection;
