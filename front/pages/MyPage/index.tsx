import MypageInfo from '@components/MypageInfo';
import MyPictures from '@components/MyPictures';
import AppLayout from '@layouts/AppLayout';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { ContentBox, EachRoomPictureList, ProfileBox, ProfileImage, ProfileInfo, SubMenu, WrapperBox } from './styles';

const dummyImages = [
  { id: 1, name: 'first_image', url: 'image_test.png' },
  { id: 2, name: 'second_image', url: 'image_test2.jpg' },
  { id: 3, name: 'third_image', url: 'image_test3.jpg' },
  { id: 4, name: 'first_image', url: 'image_test.png' },
  { id: 5, name: 'second_image', url: 'image_test2.jpg' },
  { id: 6, name: 'third_image', url: 'image_test3.jpg' },
];

const MyPage = () => {
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
                    게시물<span>0</span>
                  </div>
                </li>
                <li>
                  <div>
                    등록된 방<span>0</span>
                  </div>
                </li>
                <li>
                  <div>
                    친구수<span>0</span>
                  </div>
                </li>
              </ul>
            </ProfileInfo>
          </ProfileBox>
          <EachRoomPictureList>
            <SubMenu>
              <NavLink to={`/my_page`} className={({ isActive }) => (isActive ? 'menu_active' : undefined)} end>
                <div>
                  사진첩
                  <span>0</span>
                </div>
              </NavLink>
              <NavLink to={`/my_page/my_profile`} className={({ isActive }) => (isActive ? 'menu_active' : undefined)}>
                <div>
                  프로필 편집
                </div>
              </NavLink>
            </SubMenu>
            <div>
              {/* 여기를 Route를 활용해서 만든다. */}
              <Routes>
                <Route path="/" element={<MyPictures />} />
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
