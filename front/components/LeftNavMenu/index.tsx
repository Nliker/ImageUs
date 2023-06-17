import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { IconContext } from 'react-icons/lib';
import { FaUserCircle } from 'react-icons/fa';
import { BiArrowFromRight } from 'react-icons/bi';
import Scrollbars from 'react-custom-scrollbars-2';
import { cx } from '@emotion/css';

import useModal from '@hooks/useModal';
import useAuth from '@hooks/useAuth';
import { getErrorMessage } from '@utils/getErrorMessage';
import ChannelList from '@components/LeftNavMenu/ChannelList';
import { useUserInfo } from '@hooks/useUserInfo';
import { useSidebar } from '@hooks/useSidebar';
import MyPageMenu from './MypageMenu';
import { Blind, UserIconBox, Wrapper } from './styles';

const LeftNavMenu = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { leftBarState, setLeftbarState } = useSidebar();
  const { logOut } = useAuth();
  const { showAlertModal } = useModal();

  const isImageRoom = location.pathname.split('/')[1] === 'room';
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleUserMenu);

    return () => {
      document.removeEventListener('click', handleUserMenu);
    };
  }, []);

  const onClickLogOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const executeWork = async () => {
      try {
        navigate('/');
        await logOut();
      } catch (error) {
        const message = getErrorMessage(error);
        alert(message);
      }
    };

    showAlertModal({
      text: '로그아웃 하시겠습니까?',
      executeWork,
    });
  };

  const handleUserMenu = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !userMenuRef.current?.contains(e.target)
    ) {
      setShowUserMenu(false);
    }
  };

  return (
    <Wrapper show={leftBarState}>
      <div className="active_icon">
        <div className="close_icon" onClick={() => setLeftbarState(false)}>
          <IconContext.Provider
            value={{
              size: '100%',
              style: { color: 'gainsboro' },
            }}
          >
            <BiArrowFromRight />
          </IconContext.Provider>
        </div>
      </div>
      <div className="logo_box">
        <UserIconBox ref={userMenuRef}>
          <div
            className="icon"
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            <IconContext.Provider
              value={{
                size: '30px',
                style: { display: 'inline-block', color: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <FaUserCircle />
            </IconContext.Provider>
          </div>
          <div className={cx({ [Blind]: !showUserMenu }, 'menu')}>
            <div className="intro">
              <p style={{ margin: 0 }}>
                <span
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '1.2rem',
                    lineHeight: '1.6rem',
                  }}
                >
                  {userInfo.name}
                </span>
                님 안녕하세요!
              </p>
              <span>{userInfo.email}</span>
              {isImageRoom && (
                <NavLink to={'/my_page'} className="link">
                  마이페이지 이동하기
                </NavLink>
              )}
            </div>
            <div className="logout" onClick={onClickLogOut}>
              <span>로그아웃</span>
            </div>
          </div>
        </UserIconBox>
        <h2>ImageUs</h2>
      </div>
      <div style={{ flex: '1 0 auto' }}>
        <Scrollbars>
          {isImageRoom ? (
            <ChannelList />
          ) : (
            <>
              <MyPageMenu />
              <div className="link_box">
                <NavLink className="room_link" to="/room">
                  <span className="button_wrap">방으로 이동</span>
                </NavLink>
              </div>
            </>
          )}
        </Scrollbars>
      </div>
    </Wrapper>
  );
};

export default LeftNavMenu;
