import useInput from '@hooks/useInput';
import { DFriendData } from '@typing/db';
import searchFetcher from '@utils/searchFetcher';
import axios from 'axios';
import React, { FocusEvent, FocusEventHandler, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLinkClickHandler } from 'react-router-dom';
import useSWR from 'swr';
import { InputBox, PreviewBox, SearchResult, Wrapper } from './styles';

const SearchBox = () => {
  const [queryParams, setQueryParams] = useState('');
  const [focusSearchBox, setFocusSearchBox] = useState(false);
  const [tmpInputData, setTmpInputData, handleTmpInputData] = useInput('');
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
      //   const newData = searchData.map((data: DFriendData) => {
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

  const onFocusSearchBox = useCallback(() => {
    setFocusSearchBox(true);
  }, []);

  const onBlurSearchBox = useCallback(() => {
    setFocusSearchBox(false);
  }, []);

  const onClickPreviewItem = useCallback(
    (searchEmail: string | undefined) => () => {
      if (searchEmail) {
        setTmpInputData(searchEmail);
        setFocusSearchBox(false);
      }
    },
    [],
  );

  const onClickAddFriend = useCallback(
    (friendId: string | undefined) => async () => {
      const userId = sessionStorage.getItem('USER_ID');
      try {
        const response = await axios.post(
          `/user/${userId}/friend`,
          {
            friend_user_id: friendId,
          },
          {
            headers: {
              Authorization: `${sessionStorage.getItem('TOKEN')}`,
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

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
              onFocus={onFocusSearchBox}
              onBlur={onBlurSearchBox}
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
                searchData.map((data: DFriendData) => (
                  <li key={data.id} className={'preview_li'} onMouseDown={onClickPreviewItem(data.email)}>
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
            searchData.map((data: DFriendData) => {
              return (
                <li key={data.id}>
                  <div>
                    <span>
                      이름은 {data.name}, 이메일은 {data.email}입니다.
                    </span>
                    <button type="button" onClick={onClickAddFriend(data.id)}>
                      친구 추가하기
                    </button>
                  </div>
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
