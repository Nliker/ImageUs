import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LeftIcon, LogoutBtn, RightIcons, UserBox, UserInfo, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { Link } from 'react-router-dom';
import { Node } from 'typescript';
import { useParams } from 'react-router';

interface Props {
  handleSidebar?: (e: any) => void;
}

const ToolBar = ({ handleSidebar }: Props) => {
  const { data: isLogIn } = useSWR('/user/my');
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [showUserBox, setShowUserBox] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleCloseUserBox);
    return () => {
      window.removeEventListener('click', handleCloseUserBox);
    };
  }, [showUserBox]);

  const handleClickUserBox = useCallback(() => setShowUserBox(true), [showUserBox]);

  const handleCloseUserBox = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && showUserBox && !el.current?.contains(e.target)) setShowUserBox(false);
    },
    [showUserBox],
  );

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    // 이 부분이 mutate 하자마자 false로 바꿔주는 것인지 확인 필요
    mutate('/user/my', false);
    navigate('/');
  }, []);

  console.log('toolBar', '로그인 유무:', isLogIn);

  return (
    <Wrapper>
      {isLogIn ? (
        <>
          <RightIcons className="toolbar_icon">
            {/* <div>
              <span>
                <RiListSettingsLine />
              </span>
            </div> */}
            <div>
              <span onClick={handleClickUserBox}>
                <BiUserCircle />
              </span>
            </div>
          </RightIcons>
          {roomId && (
            <LeftIcon className="toolbar_icon">
              <span>
                <MdOutlineSpaceDashboard onClick={handleSidebar} />
              </span>
            </LeftIcon>
          )}
        </>
      ) : (
        <div className="action_box">
          <Link to={'/login'}>로그인</Link>
          <Link to={'/signup'}>회원가입</Link>
        </div>
      )}

      {/* 로그아웃 상자 토글 버튼 */}
      {showUserBox && (
        <UserBox ref={el}>
          <UserInfo>
            {/* <img src="image_test.png" alt="test_img" /> */}
            <div className={'info_words'}>
              <p>
                <span>이름</span>님 어서오세요!
              </p>
              <p>asdfaskla@naver.com</p>
            </div>
          </UserInfo>
          <LogoutBtn>
            <span onClick={onClickLogOut}>로그아웃</span>
          </LogoutBtn>
        </UserBox>
      )}
    </Wrapper>
  );
};

export default memo(ToolBar);
