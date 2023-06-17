import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { IconContext } from 'react-icons';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

import useRoomList from '@hooks/useRoomList';
import useFriendList from '@hooks/useFriendList';
import useUserImageData from '@hooks/useUserImgData';
import FriendList from '@pages/MyPage/Components/FriendList';
import { useUserInfo } from '@hooks/useUserInfo';
import SearchBox from '@pages/MyPage/Components/SearchBox';
import { useSidebar } from '@hooks/useSidebar';
import MyPicture from './Components/MyPicture';
import MyProfile from './Components/MyProfile';
import { ContentBox, ProfileInfo, WrapperBox } from './styles';

const MyPage = () => {
  const { userInfo } = useUserInfo();
  const { leftBarState, setLeftbarState } = useSidebar();
  const { totalFriendCount } = useFriendList();
  const { totalRoomCount } = useRoomList(userInfo.id);
  const { totalImageCount } = useUserImageData(userInfo.id);

  return (
    <WrapperBox>
      <ContentBox>
        <Scrollbars>
          {!leftBarState && (
            <div className="nav_icon" onClick={() => setLeftbarState(true)}>
              <IconContext.Provider
                value={{
                  size: '30px',
                  style: { color: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <AiOutlineMenuUnfold />
              </IconContext.Provider>
            </div>
          )}
          <ProfileInfo>
            <div>
              <span className="user_name">{userInfo?.name ?? 'USER'}</span> 님
            </div>
            <ul>
              <li>
                <div>
                  저장된 사진 <span>{totalImageCount ?? 0}</span>
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
          <div className="content">
            <Routes>
              <Route index element={<MyProfile userInfo={userInfo} />} />
              <Route
                path="my_picture"
                element={<MyPicture userId={userInfo.id} />}
              />
              <Route path="friends" element={<FriendList />} />
              <Route path="user_search" element={<SearchBox />} />
              <Route path="*" element={<Navigate to="/my_page" />} />
            </Routes>
          </div>
        </Scrollbars>
      </ContentBox>
    </WrapperBox>
  );
};

export default MyPage;
