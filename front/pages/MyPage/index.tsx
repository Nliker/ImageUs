import MypageInfo from '@components/MypageInfo';
import MyPictures from '@components/MyPictures';
import AppLayout from '@layouts/AppLayout';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { ContentBox, EachRoomPictureList, ProfileBox, ProfileImage, ProfileInfo, SubMenu, WrapperBox } from './styles';
import { getImageData, getUserFriendList, getUserImageList, getUserRoomListFetcher } from '@utils/userDataFetcher';
import { IImageData } from '@typing/db';
import { userImageLoadNumber } from '@hooks/swrStore';

const MyPage = () => {
  const { data: roomlist, mutate: mutateRoomList } = useSWR('roomlist', getUserRoomListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: friendList, mutate: mutateFriendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { start } = userImageLoadNumber();
  const { data: imageList } = useSWR<Array<IImageData> | undefined>(['userImageList', start], getUserImageList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: imageDataList, trigger } = useSWRMutation('/image-download', getImageData);

  // 스크롤이 일어날 때 imageList 요청을 보내서 다음 사진을 받고
  // mutate(key, start + 개수 + 1, true)로 이미지 로드 시작번호를 업데이트 한다.

  // console.log(imageList);

  useEffect(() => {
    if (!imageList) return;
    trigger(imageList);
  }, [imageList]);

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
                    게시물<span>{imageList?.length}</span>
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
              <NavLink to={`/my_page`} className={({ isActive }) => (isActive ? 'menu_active' : undefined)} end>
                <div>사진첩</div>
              </NavLink>
              <NavLink to={`/my_page/my_profile`} className={({ isActive }) => (isActive ? 'menu_active' : undefined)}>
                <div>프로필</div>
              </NavLink>
            </SubMenu>
            <div>
              {/* 여기를 Route를 활용해서 만든다. */}
              <Routes>
                <Route path="/" element={<MyPictures imageList={imageDataList} />} />
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
