import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import { NavLink } from 'react-router-dom';
import { Routes, Route, Navigate, useParams } from 'react-router';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { Scrollbars } from 'react-custom-scrollbars-2';

import AppLayout from '@layouts/AppLayout';

import MyProfile from './Components/MyProfile';
import MyPictures from './Components/MyPictures';
import {
  ContentBox,
  EachRoomPictureList,
  ProfileBox,
  ProfileImage,
  ProfileInfo,
  SubMenu,
  WrapperBox,
} from './styles';
import { Button } from '@styles/Button';
import { DeviceCheckContext } from '@pages/ImageRoom';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';
import useRoomList from '@hooks/useRoomList';
import useFriendList from '@hooks/useFriendList';

const MyPage = () => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) return null;

  const { data: userInfo } = useSWR('/user/my');
  const { showUploadImgModal } = useModal();
  const { totalFriendCount } = useFriendList();
  const { totalRoomCount } = useRoomList(userId);
  const { totalImageCount } = useUserData(userId);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const onClickUploadModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showUploadImgModal('user');
  };

  return (
    <AppLayout>
      <WrapperBox>
        <Scrollbars>
          <ContentBox>
            <ProfileBox>
              <ProfileImage>
                <IconContext.Provider
                  value={{ size: '100%', style: { display: 'inline-block' } }}
                >
                  <BiUserCircle />
                </IconContext.Provider>
              </ProfileImage>
              <ProfileInfo>
                <div>
                  <h2>{userInfo?.userInfo?.name ?? 'USER'}</h2>
                </div>
                <ul>
                  <li>
                    <div>
                      게시물 <span>{totalImageCount ?? 0}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      등록된 방 <span>{totalRoomCount ?? 0}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      친구수 <span>{totalFriendCount ?? 0}</span>
                    </div>
                  </li>
                </ul>
              </ProfileInfo>
            </ProfileBox>
            <div className="upload_image">
              <Button onClick={onClickUploadModal}>이미지 업로드하기</Button>
            </div>
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
              <Routes>
                <Route
                  index
                  element={
                    <DeviceCheckContext.Provider value={isMobile}>
                      <MyPictures />
                    </DeviceCheckContext.Provider>
                  }
                />
                <Route path="my_profile" element={<MyProfile />} />
                <Route path="*" element={<Navigate to="/my_page" />} />
              </Routes>
            </EachRoomPictureList>
          </ContentBox>
        </Scrollbars>
      </WrapperBox>
    </AppLayout>
  );
};

export default MyPage;
