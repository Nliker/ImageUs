import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { NavLink } from 'react-router-dom';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import Scrollbars from 'react-custom-scrollbars';

import { CImageData } from '@typing/client';
import useIntersect from '@hooks/useIntersect';
import AppLayout from '@layouts/AppLayout';
import {
  getUserFriendList,
  getUserImageLen,
  getUserImageList,
  getUserRoomListFetcher,
} from '@utils/userDataFetcher';

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
import { getImageData } from '@utils/imageFetcher';
import { Button } from '@styles/Button';
import { DeviceCheckContext } from '@pages/ImageRoom';

const MyPage = () => {
  const { pathname } = useLocation();
  const userId = sessionStorage.getItem('user_id');
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { data: roomlist } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: friendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: userImageList, mutate: mutateUserImageList } = useSWR<
    CImageData[]
  >('/user/imageDataList', {
    fallbackData: [],
  });
  const { data: allImageLen } = useSWR(
    `/user/${userId}/imagelist-len`,
    getUserImageLen,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: userInfo } = useSWR('/user/my');

  const {
    data: requestImageList,
    trigger: requestImageListInfo,
    isMutating: requestImageLoading,
  } = useSWRMutation(`/user/${userId}/imagelist`, getUserImageList);

  const { trigger: imageDataTrigger, isMutating: imageDataLoading } =
    useSWRMutation('/user/image-download', getImageData);

  const [readStartNumber, setReadStartNumber] = useState(0);
  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (
        !requestImageLoading &&
        !imageDataLoading &&
        requestImageList?.loadDataLength === 12
      ) {
        requestImageListInfo(readStartNumber);
      }
    },
    {
      threshold: 0.5,
    },
  );

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (pathname !== '/my_page') return;
    requestImageListInfo(readStartNumber);

    return () => {
      setReadStartNumber(0);
      mutateUserImageList([]);
    };
  }, [pathname]);

  useEffect(() => {
    if (!requestImageList || requestImageLoading || !userImageList) return;

    setReadStartNumber((prev) => prev + 12);
    imageDataTrigger(requestImageList.imagelist).then((newImage) => {
      if (newImage) mutateUserImageList([...userImageList, ...newImage]);
    });
  }, [requestImageList]);

  const onClickUploadModal = () => {
    mutate('modalState', {
      currentModalState: 'upload',
      uploadLocation: 'user',
    });
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
                      게시물 <span>{allImageLen?.imagelist_len ?? 0}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      등록된 방 <span>{roomlist?.length ?? 0}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      친구수 <span>{friendList?.length ?? 0}</span>
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
                  path="/"
                  element={
                    <DeviceCheckContext.Provider value={isMobile}>
                      <MyPictures
                        imageList={userImageList}
                        observerRef={observerRef}
                      />
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
