import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import { VscSearchStop } from 'react-icons/vsc';
import { IconContext } from 'react-icons/lib';
import Scrollbars from 'react-custom-scrollbars-2';

import { DFriendData } from '@typing/db';
import useInput from '@hooks/useInput';
import searchFetcher from '@utils/searchFetcher';
import { Button } from '@styles/Button';
import useFriendList from '@hooks/useFriendList';
import { getErrorMessage } from '@utils/getErrorMessage';
import { InputBox, PreviewBox, SearchResult, Wrapper } from './styles';

interface IProps {
  inviteMemberToRoom?: (selectIdList: number[]) => Promise<void>;
}

const SearchBox = ({ inviteMemberToRoom }: IProps) => {
  const isImageRoom = location.pathname.split('/')[1] === 'room';
  const [queryParams, setQueryParams] = useState('');
  const [focusSearchBox, setFocusSearchBox] = useState(false);
  const [searchData, setSearchData] = useState<DFriendData>();
  const [tmpInputData, setTmpInputData, handleTmpInputData] = useInput('');

  const { registerFriend } = useFriendList();

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

  const onClickAddFriend = (friendData: DFriendData) => async () => {
    try {
      await registerFriend(friendData.id);
      alert(`${friendData.name}님을 친구 목록에 추가하였습니다!`);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const onClickInviteMember = (friendData: DFriendData) => async () => {
    try {
      if (!inviteMemberToRoom)
        throw Error('예기치 못한 에러가 발생하였습니다..');
      await inviteMemberToRoom([friendData.id]);

      alert(`${friendData.name}님을 방에 초대하였습니다!`);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <Wrapper isImageRoom={isImageRoom}>
      <InputBox>
        <form onSubmit={onSubmitSearchData}>
          <div className="search_input">
            <label htmlFor="searchFriend">Search</label>
            <input
              type="text"
              id="searchFriend"
              name="search"
              autoComplete="off"
              placeholder="이메일을 입력하세요.."
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
            {prevSearchDataList && prevSearchDataList?.length !== 0 ? (
              <ul className="preview_data">
                <Scrollbars>
                  {prevSearchDataList.map((data: DFriendData) => (
                    <li
                      key={data.id}
                      className="preview_item"
                      onMouseDown={onClickPreviewItem(data)}
                    >
                      <div className="search_result_space">
                        <span>이름: {data.name}</span>
                        <span>이메일: {data.email}</span>
                        <span>가입유형: {data.user_type}</span>
                      </div>
                    </li>
                  ))}
                </Scrollbars>
              </ul>
            ) : (
              <div className="no_data">
                <p>{`검색 결과가
없습니다.`}</p>
              </div>
            )}
          </PreviewBox>
        )}
      </InputBox>
      <SearchResult>
        <h3>검색결과</h3>
        {searchData ? (
          <div className="result_box">
            <div className="result_data">
              <p>
                이름: <span className="item"> {searchData?.name}</span>
              </p>
              <p>
                이메일: <span className="item"> {searchData?.email}</span>
              </p>
            </div>
            <div className="button_group">
              <Button type="button" onClick={onClickAddFriend(searchData)}>
                친구 추가하기
              </Button>
              {isImageRoom && (
                <Button onClick={onClickInviteMember(searchData)}>
                  방에 초대하기
                </Button>
              )}
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
