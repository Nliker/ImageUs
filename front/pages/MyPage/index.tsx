import React, { useEffect, useMemo, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Routes, Route, Navigate, useOutletContext } from 'react-router';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Button } from '@styles/Button';
import useModal from '@hooks/useModal';
import useRoomList from '@hooks/useRoomList';
import useFriendList from '@hooks/useFriendList';
import useUserImageData from '@hooks/useUserImgData';

import MyProfile from './Components/MyProfile';
import {
  ContentBox,
  EachRoomPictureList,
  ImageContainer,
  ProfileBox,
  ProfileImage,
  ProfileInfo,
  SubMenu,
  WrapperBox,
} from './styles';
import useIntersect from '@hooks/useIntersect';
import { Spinner } from '@styles/Spinner';
import ImageSection from '@components/ImageSection';
import { IImageData, PrivateChildProps } from '@typing/client';
import AppLayout from '@layouts/AppLayout';

const MyPage = () => {
  const { userInfo } = useOutletContext<PrivateChildProps>();
  const { showUploadImgModal } = useModal();
  const { totalFriendCount } = useFriendList();
  const { totalRoomCount } = useRoomList(userInfo.id);
  const {
    initialLoading,
    userImageList,
    userImgLoading,
    totalImageCount,
    imageLoadEnd,
    loadImage,
    deleteStoreImage,
    uploadUserImage,
    clearUserImageList,
  } = useUserImageData(userInfo.id);

  const [readStartNumber, setReadStartNum] = useState(0);
  const effectRan = useRef(false);

  const imageSectionProps = useMemo(
    () => ({
      imageList: userImageList as IImageData[],
      imgListLoading: userImgLoading,
      deleteImgFunc: deleteStoreImage,
    }),
    [userImageList, userImgLoading],
  );

  const observerRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);

      if (userImgLoading || imageLoadEnd) {
        return;
      }

      loadImageFunc();
    },
    {
      threshold: 0.5,
    },
  );

  const loadImageFunc = async () => {
    const loadImageState = await loadImage({
      readStartNumber,
    });

    if (loadImageState) setReadStartNum(loadImageState.readStartNumber);
  };

  const onClickUploadModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showUploadImgModal({ executeFunc: uploadUserImage });
  };

  useEffect(() => {
    if (effectRan.current === false) {
      loadImageFunc();
    }

    return () => {
      setReadStartNum(0);
      clearUserImageList();
      effectRan.current = true;
    };
  }, []);

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
                  <h2 className="user_name">{userInfo?.name ?? 'USER'}</h2>
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
                    <ImageContainer>
                      {initialLoading ? (
                        <Spinner />
                      ) : (
                        <ImageSection
                          imageSectionProps={imageSectionProps}
                          observerRef={observerRef}
                        />
                      )}
                    </ImageContainer>
                  }
                />
                <Route
                  path="my_profile"
                  element={<MyProfile userInfo={userInfo} />}
                />
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
