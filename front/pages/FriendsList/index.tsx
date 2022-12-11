import useInput from '@hooks/useInput';
import AppLayout from '@layouts/AppLayout';
import { ISearchData } from '@typing/db';
import searchFetcher from '@utils/searchFetcher';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ContentBox, ContentList, Header, SearchBox, SearchResult, Wrapper } from './styles';

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
  const [queryParams, setQueryParams] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tmpInputData, , handleTmpInputData] = useInput('');
  const { data: searchData, mutate: searchMutate } = useSWR(['user/search', queryParams], searchFetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryParams(tmpInputData);
      searchMutate();
    }, 1000);
    return () => clearTimeout(debounce);
  }, [tmpInputData]);

  const onSubmitSearchData = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setSearchResult(() => {
    //   const newData = searchData.map((data: ISearchData) => {
    //     return {
    //       email: data.email,
    //       name: data.name
    //     }
    //   });
    //   return newData;
    // })
  }, [tmpInputData]);

  console.log(searchData);

  return (
    <AppLayout>
      <Wrapper>
        <Header>
          <div>
            <h1>친구 관리</h1>
          </div>
        </Header>
        <ContentBox>
          <h2>유저 검색</h2>
          <SearchBox>
            <form onSubmit={onSubmitSearchData}>
              <div className="search_input">
                <label htmlFor="searchFriend">Search</label>
                <input
                  type="text"
                  id="searchFriend"
                  name="search"
                  autoComplete="off"
                  placeholder="검색할 유저의 이메일을 입력하세요.."
                  onChange={handleTmpInputData}
                  value={tmpInputData}
                />
              </div>
              <div className="search_btn">
                <button type="submit">검색</button>
              </div>
            </form>
            <SearchResult>
              <div>
                {searchData && searchData?.length !== 0 ? (
                  <ul>
                    {searchData.map((data: ISearchData) => (
                      <li>
                        이름: {data.name}, email: {data.email}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>검색 결과가 없습니다.</span>
                )}
              </div>
              <div>
                {searchData && searchData.length !== 0 ? <ul>
                  {searchData.map((data: ISearchData) => {
                    return <li>이름은 {data.name}, 이메일은 {data.email}입니다.</li>
                  })}
                </ul> : <span>검색결과가 없습니다.</span>}
              </div>
            </SearchResult>
          </SearchBox>
          <h2>친구 목록</h2>
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
                        <div>
                          <button type="button">함께 있는 방 조회</button>
                        </div>
                      </td>
                      <td>
                        <div>
                          <button type="button">삭제</button>
                        </div>
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
