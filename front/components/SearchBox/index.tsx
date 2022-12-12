import useInput from '@hooks/useInput';
import { ISearchData } from '@typing/db';
import searchFetcher from '@utils/searchFetcher';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { SearchResult, Wrapper } from './styles';

const SearchBox = () => {
  const [queryParams, setQueryParams] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [tmpInputData, , handleTmpInputData] = useInput('');
  const { data: searchData, mutate: searchMutate } = useSWR(['/user/search', queryParams], searchFetcher, {
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

  const onSubmitSearchData = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
    },
    [tmpInputData],
  );
  return (
    <Wrapper>
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
          {searchData && searchData.length !== 0 ? (
            <ul>
              {searchData.map((data: ISearchData) => {
                return (
                  <li>
                    이름은 {data.name}, 이메일은 {data.email}입니다.
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>검색결과가 없습니다.</span>
          )}
        </div>
      </SearchResult>
    </Wrapper>
  );
};

export default SearchBox;
