import AppLayout from '@layouts/AppLayout';
import React from 'react';
import { ContentBox, ContentList, Header, SearchBox, Wrapper } from './styles';

const dummyFreindList = [
  {
    id: 1,
    name: '친구1',
    email: 'email1',
    type: 'freind',
  },
  {
    id: 2,
    name: '친구2',
    email: 'email2',
    type: 'freind',
  },
  {
    id: 3,
    name: '친구3',
    email: 'email3',
    type: 'freind',
  },
  {
    id: 4,
    name: '가족1',
    email: 'email4',
    type: 'family',
  },
  {
    id: 5,
    name: '가족2',
    email: 'email5',
    type: 'family',
  },
];

// 전체 친구들 목록을 보여주고 각 친구들 추가와 삭제

const FriendList = () => {
  return (
    <AppLayout>
      <Wrapper>
        <Header>
          <div>
            <h1>친구 관리</h1>
          </div>
        </Header>
        <ContentBox>
          <SearchBox>
            <form method='get'>
              <div className='search_input'>
                <label htmlFor="searchFriend">Search</label>
                <input type="text" id='searchFriend' name='search' autoComplete='off' placeholder='검색할 유저의 이메일을 입려하세요..'/>
              </div>
              <div className='search_btn'><button type='submit' >검색</button></div>
            </form>
          </SearchBox>
          <ContentList>
            <div>
              <table>
                <colgroup></colgroup>
                <thead>
                  <tr>
                    <th scope="col">이름</th>
                    <th scope="col">이메일</th>
                    <th scope="col">관계</th>
                    <th scope="col">조회</th>
                    <th scope="col">목록에서 삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyFreindList.map((data) => (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.type}</td>
                      <td>
                        <div><button type='button'>함께 있는 방 조회</button></div>
                      </td>
                      <td>
                        <div><button type='button'>삭제</button></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentList>
        </ContentBox>
      </Wrapper>
    </AppLayout>
  );
};

export default FriendList;
