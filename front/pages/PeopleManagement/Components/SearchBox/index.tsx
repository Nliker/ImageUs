import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { VscSearchStop } from 'react-icons/vsc';
import { IconContext } from 'react-icons/lib';

import { DFriendData } from '@typing/db';
import useInput from '@hooks/useInput';
import searchFetcher from '@utils/searchFetcher';
import { postNewFriend } from '@utils/userDataFetcher';
import { Button } from '@styles/Button';
import { InputBox, PreviewBox, SearchResult, Wrapper } from './styles';

const SearchBox = () => {
  const { mutate } = useSWRConfig();
  const [queryParams, setQueryParams] = useState('');

  const { data: prevSearchDataList } = useSWR(
    `/user/search?email=${queryParams}`,
    searchFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    },
  );
  const { trigger: registerFriendTrigger } = useSWRMutation(
    '/user/friend',
    postNewFriend,
  );

  const [focusSearchBox, setFocusSearchBox] = useState(false);
  const [searchData, setSearchData] = useState<DFriendData>();
  const [tmpInputData, setTmpInputData, handleTmpInputData] = useInput('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryParams(tmpInputData);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tmpInputData]);

  const onSubmitSearchData = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const clickItemData = prevSearchDataList?.find(
        (data) => data.email === tmpInputData,
      );
      setSearchData(clickItemData);
    },
    [tmpInputData, queryParams, prevSearchDataList],
  );

  const onClickPreviewItem = useCallback(
    (searchEmailData: DFriendData | undefined) => () => {
      if (searchEmailData?.id) {
        setTmpInputData(searchEmailData.email ?? '');
        setFocusSearchBox(false);

        const clickItemData = prevSearchDataList?.find(
          (data) => data.id === searchEmailData.id,
        );
        setSearchData(clickItemData);
      }
    },
    [prevSearchDataList],
  );

  const onClickAddFriend = useCallback(
    (friendId?: number) => () => {
      mutate('friendlist', registerFriendTrigger(friendId));
    },
    [searchData],
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
              onFocus={() => setFocusSearchBox(true)}
              onBlur={() => setFocusSearchBox(false)}
              value={tmpInputData}
            />
          </div>
          <div className="search_btn">
            <Button type="submit">검색</Button>
          </div>
        </form>
        {focusSearchBox && (
          <PreviewBox>
            <ul>
              {prevSearchDataList && prevSearchDataList?.length !== 0 ? (
                prevSearchDataList.map((data: DFriendData) => (
                  <li
                    key={data.id}
                    className={'preview_li'}
                    onMouseDown={onClickPreviewItem(data)}
                  >
                    <div className="search_result_space">
                      <span>email: {data.email}</span>
                      <span>이름: {data.name}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div>
                    <span>검색 결과가 없습니다.</span>
                  </div>
                </li>
              )}
            </ul>
          </PreviewBox>
        )}
      </InputBox>
      <SearchResult>
        {searchData ? (
          <div className="search_result_box">
            <h2>검색결과</h2>
            <div className="search_result">
              <span>이름: {searchData?.name}</span>
              <span>이메일: {searchData?.email}입니다.</span>
              <Button type="button" onClick={onClickAddFriend(searchData?.id)}>
                친구 추가하기
              </Button>
            </div>
          </div>
        ) : (
          <div className="not_found">
            <IconContext.Provider
              value={{ size: '30%', style: { display: 'inline-block' } }}
            >
              <VscSearchStop />
            </IconContext.Provider>
            <div className="not_found_text">
              <span>검색 결과가 없습니다.</span>
            </div>
          </div>
        )}
      </SearchResult>
    </Wrapper>
  );
};

export default SearchBox;