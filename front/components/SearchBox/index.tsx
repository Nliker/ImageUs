import useInput from '@hooks/useInput';
import { Button } from '@styles/Button';
import { DFriendData } from '@typing/db';
import searchFetcher from '@utils/searchFetcher';
import axios from 'axios';
import { VscSearchStop } from 'react-icons/vsc';
import React, {
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLinkClickHandler } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { InputBox, PreviewBox, SearchResult, Wrapper } from './styles';
import { IconContext } from 'react-icons/lib';
import { postNewFriend } from '@utils/userDataFetcher';

const SearchBox = () => {
  const [queryParams, setQueryParams] = useState('');
  const [focusSearchBox, setFocusSearchBox] = useState(false);
  const [searchData, setSearchData] = useState<DFriendData>();
  const [tmpInputData, setTmpInputData, handleTmpInputData] = useInput('');

  const { mutate } = useSWRConfig();
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

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('디바운싱 부분');
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
    (searchEmail: string | undefined) => () => {
      if (searchEmail) {
        setTmpInputData(searchEmail);
        setFocusSearchBox(false);

        const clickItemData = prevSearchDataList?.find(
          (data) => data.email === searchEmail,
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
                    onMouseDown={onClickPreviewItem(data.email)}
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
