import FriendList from '@components/FriendList';
import SearchBox from '@components/SearchBox';
import AppLayout from '@layouts/AppLayout';
import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ContentBox, Header, TabBox, Wrapper } from './styles';

// 전체 친구들 목록을 보여주고 각 친구들 추가와 삭제

const PeopleManagement  = () => {

  return (
    <AppLayout>
      <Wrapper>
        <Header>
          <div>
            <h1>친구 관리</h1>
          </div>
        </Header>
        <ContentBox>
          <TabBox>
            <div>
              <NavLink to={''} end>
                <div>
                  <h2>친구 목록</h2>
                </div>
              </NavLink>
              <NavLink to={'search'}>
                <div>
                  <h2>유저 검색</h2>
                </div>
              </NavLink>
            </div>
          </TabBox>
          <Routes>
            <Route path='/' element={<FriendList />} />
            <Route path='/search' element={<SearchBox />} />
          </Routes>
        </ContentBox>
      </Wrapper>
    </AppLayout>
  );
};

export default PeopleManagement;
