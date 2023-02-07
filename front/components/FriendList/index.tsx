import { DFriendData } from '@typing/db';
import { deleteUserFriend, getUserFriendList } from '@utils/userDataFetcher';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Wrapper } from './styles';

const FriendList = () => {
  const { data: friendListData, mutate: friendListMutate } = useSWR(
    'friendlist',
    getUserFriendList,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { trigger } = useSWRMutation('deleteFriend', deleteUserFriend);

  const handleDeleteFriend = useCallback(
    (friendId: number | undefined) => async () => {
      await trigger(friendId);
      await friendListMutate();
    },
    [],
  );

  return (
    <Wrapper>
      <div>
        <table>
          <colgroup></colgroup>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">이메일</th>
              <th scope="col">관계</th>
              {/* <th scope="col">조회</th> */}
              <th scope="col">목록에서 삭제</th>
            </tr>
          </thead>
          <tbody>
            {friendListData &&
              friendListData.map((data: DFriendData) => (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.profile}</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={handleDeleteFriend(data.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default FriendList;
