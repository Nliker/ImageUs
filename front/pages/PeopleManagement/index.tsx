import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import AppLayout from '@layouts/AppLayout';
import FriendList from './Components/FriendList';
import SearchBox from './Components/SearchBox';
import { ContentBox, Header, TabBox, TabContent, Wrapper } from './styles';

const PeopleManagement = () => {
  return (
    <Wrapper>
      <Scrollbars>
        <div className="content_wrapper">
          <Header>
            <div>
              <h2>친구 관리</h2>
            </div>
          </Header>
          <ContentBox>
            <TabBox>
              <ul>
                <li>
                  <NavLink
                    to={''}
                    className={({ isActive }) =>
                      isActive ? 'active_tab' : undefined
                    }
                    end
                    defaultChecked
                  >
                    친구 목록
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'search'}
                    className={({ isActive }) =>
                      isActive ? 'active_tab' : undefined
                    }
                  >
                    유저 검색
                  </NavLink>
                </li>
              </ul>
            </TabBox>
            <TabContent>
              <Routes>
                <Route path="/" element={<FriendList />} />
                <Route path="/search" element={<SearchBox />} />
                <Route
                  path="*"
                  element={<Navigate to="/people_management" />}
                />
              </Routes>
            </TabContent>
          </ContentBox>
        </div>
      </Scrollbars>
    </Wrapper>
  );
};

export default PeopleManagement;
