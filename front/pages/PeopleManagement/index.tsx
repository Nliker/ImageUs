import FriendList from '@components/FriendList';
import SearchBox from '@components/SearchBox';
import AppLayout from '@layouts/AppLayout';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ContentBox, Header, TabBox, TabContent, Wrapper } from './styles';

// 전체 친구들 목록을 보여주고 각 친구들 추가와 삭제

const PeopleManagement = () => {
  return (
    <AppLayout>
      <Wrapper>
        <Scrollbars>
          <div className="content_wrapper">
            <Header>
              <div>
                <h1>친구 관리</h1>
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
                </Routes>
              </TabContent>
            </ContentBox>
          </div>
        </Scrollbars>
      </Wrapper>
    </AppLayout>
  );
};

export default PeopleManagement;
