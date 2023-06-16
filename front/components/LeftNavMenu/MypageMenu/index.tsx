import React from 'react';
import { Wrapper } from './styles';
import { NavLink } from 'react-router-dom';

function MyPageMenu() {
  return (
    <Wrapper>
      <ul className="menu">
        <li>
          <NavLink
            to={`/my_page`}
            className={({ isActive }) =>
              isActive ? 'menu_active link' : 'link'
            }
            end
          >
            프로필
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/my_page/my_picture`}
            className={({ isActive }) =>
              isActive ? 'menu_active link' : 'link'
            }
          >
            개인 사진첩
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/my_page/friends`}
            className={({ isActive }) =>
              isActive ? 'menu_active link' : 'link'
            }
          >
            친구 목록
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/my_page/user_search`}
            className={({ isActive }) =>
              isActive ? 'menu_active link' : 'link'
            }
          >
            유저 검색
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
}

export default MyPageMenu;
