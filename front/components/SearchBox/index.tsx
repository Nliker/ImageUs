import useInput from '@hooks/useInput';
import { ISearchData } from '@typing/db';
import searchFetcher from '@utils/searchFetcher';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLinkClickHandler } from 'react-router-dom';
import useSWR from 'swr';
import { InputBox, PreviewBox, SearchResult, Wrapper } from './styles';

const SearchBox = () => {
  const [queryParams, setQueryParams] = useState('');
  const [focusSearchBox, setFocusSearchBox] = useState(false);
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
    }, 700);
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

  const FocusSearchBox = useCallback(() => {
    setFocusSearchBox(true);
  }, []);

  const BlurSearchBox = useCallback(() => {
    setFocusSearchBox(false);
  }, []);

  return (
    <Wrapper>
      <InputBox>
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
              onFocus={FocusSearchBox}
              onBlur={BlurSearchBox}
              value={tmpInputData}
            />
          </div>
          <div className="search_btn">
            <button type="submit">검색</button>
          </div>
        </form>
        {focusSearchBox && (
          <PreviewBox>
            <ul>
              {searchData && searchData?.length !== 0 ? (
                searchData.map((data: ISearchData) => (
                  <li key={data.id}>
                    <span>
                      이름: {data.name}, email: {data.email}
                    </span>
                  </li>
                ))
              ) : (
                <li>
                  <p>검색 결과가 없습니다.</p>
                </li>
              )}
            </ul>
          </PreviewBox>
        )}
      </InputBox>
      <SearchResult>
        <ul>
          {searchData && searchData.length !== 0 ? (
            searchData.map((data: ISearchData) => {
              return (
                <li key={data.id}>
                  <span>이름은 {data.name}, 이메일은 {data.email}입니다.</span>
                </li>
              );
            })
          ) : (
            <li>
              <p>검색 결과가 없습니다.</p>
            </li>
          )}
        </ul>
      </SearchResult>
    </Wrapper>
  );
};

export default SearchBox;
