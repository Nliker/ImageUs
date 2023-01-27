import MypageInfo from '@components/MypageInfo';
import MyPictures from '@components/MyPictures';
import AppLayout from '@layouts/AppLayout';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import {
  ContentBox,
  EachRoomPictureList,
  ProfileBox,
  ProfileImage,
  ProfileInfo,
  SubMenu,
  WrapperBox,
} from './styles';
import {
  getImageData,
  getUserFriendList,
  getUserImageList,
  getUserRoomListFetcher,
} from '@utils/userDataFetcher';
import { DImageData } from '@typing/db';
import { userImageLoadNumber } from '@hooks/swrStore';
import { CImageData } from '@typing/client';
import useIntersect from '@hooks/useIntersect';

const MyPage = () => {
  const userId = sessionStorage.getItem('USER_ID');

  const { data: roomlist, mutate: mutateRoomList } = useSWR(
    'roomlist',
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: friendList, mutate: mutateFriendList } = useSWR(
    'friendlist',
    getUserFriendList,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: userImageList, mutate: mutateImageList } = useSWR<CImageData[]>(
    '/user/imageDataList',
    {
      fallbackData: [],
    },
  );

  const {
    data: imageListInfo,
    trigger: requestImageListInfo,
    isMutating: imageInfoLoading,
  } = useSWRMutation(`/user/${userId}/imagelist`, getUserImageList);
  const { trigger: imageDataTrigger, isMutating: imageDataLoading } =
    useSWRMutation('/user/image-download', getImageData);

  const [readStartNumber, setReadStartNumber] = useState(0);

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      /*

    데이터 fetching 중이 아니고 다음 로드할 데이터가 남아있다면 데이터를 부른다.(imageList 요청)

    */
      if (
        !imageInfoLoading &&
        !imageDataLoading &&
        imageListInfo?.loadDataLength === 12
      ) {
        console.log('인터섹션 데이터 패칭 요청');
        requestImageListInfo(readStartNumber);
      }
    },
    {
      threshold: 0.5,
    },
  );

  useEffect(() => {
    requestImageListInfo(readStartNumber);

    return () => {
      console.log('마이페이지 언마운트');
      setReadStartNumber(0);
      mutateImageList([], false);
    };
  }, []);

  useEffect(() => {
    if (!imageListInfo || !userImageList) return;

    setReadStartNumber((prev) => prev + 12);
    imageDataTrigger(imageListInfo.imagelist).then((newImage) => {
      if (newImage) mutateImageList([...userImageList, ...newImage]);
    });
  }, [imageListInfo]);

  return (
    <AppLayout>
      <WrapperBox>
        <ContentBox>
          <ProfileBox>
            <ProfileImage>
              <img src="" alt="프로필 사진" />
            </ProfileImage>
            <ProfileInfo>
              <div>
                <h2>이름</h2>
              </div>
              <ul>
                <li>
                  <div>
                    게시물<span>{imageListInfo?.loadDataLength}</span>
                  </div>
                </li>
                <li>
                  <div>
                    등록된 방<span>{roomlist?.length}</span>
                  </div>
                </li>
                <li>
                  <div>
                    친구수<span>{friendList?.length}</span>
                  </div>
                </li>
              </ul>
            </ProfileInfo>
          </ProfileBox>
          <EachRoomPictureList>
            <SubMenu>
              <NavLink
                to={`/my_page`}
                className={({ isActive }) =>
                  isActive ? 'menu_active' : undefined
                }
                end
              >
                <div>사진첩</div>
              </NavLink>
              <NavLink
                to={`/my_page/my_profile`}
                className={({ isActive }) =>
                  isActive ? 'menu_active' : undefined
                }
              >
                <div>프로필</div>
              </NavLink>
            </SubMenu>
            <div>
              {/* 여기를 Route를 활용해서 만든다. */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <MyPictures
                      imageList={userImageList}
                      observerRef={observerRef}
                    />
                  }
                />
                <Route path="my_profile" element={<MypageInfo />} />
              </Routes>
            </div>
          </EachRoomPictureList>
        </ContentBox>
      </WrapperBox>
    </AppLayout>
  );
};

export default MyPage;
