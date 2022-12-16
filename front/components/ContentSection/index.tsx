import React, { memo, useEffect } from 'react';
import { IImageData } from '@typing/db';
import { getImageListFetcher } from '@utils/roomDataFetcher';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { ContentBox, ImageCard, ImageInfo, InfoItem, MainContainer, Wrapper } from './styles';

const dummyImages = [
  { id: 1, name: 'first_image', url: 'image_test.png' },
  { id: 2, name: 'second_image', url: 'image_test2.jpg' },
  { id: 3, name: 'third_image', url: 'image_test3.jpg' },
  { id: 4, name: 'first_image', url: 'image_test.png' },
  { id: 5, name: 'second_image', url: 'image_test2.jpg' },
  { id: 6, name: 'third_image', url: 'image_test3.jpg' },
];

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
  url: string;
  name: string;
}

const ContentSection = memo(() => {
  // const { roomId } = useParams<{ roomId?: string }>();
  const { data: roomId } = useSWR('roomId');
  const { data: imageList, mutate: imageListTrigger } = useSWR(['imagelist', roomId], getImageListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
        ) : (
          imageList?.map((data: IImageData) => {
            return (
              <ContentBox key={data.id}>
                <div>
                  <Link to="#">
                    <ImageCard>
                      <img src={`${data.link}`} alt={``} />
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
          })
        )}
      </MainContainer>
    </Wrapper>
  );
});

export default ContentSection;
