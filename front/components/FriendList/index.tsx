import { Button } from '@styles/Button';
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
      <table>
        <colgroup>
          <col span={1} style={{ width: '15%' }} />
          <col span={1} style={{ width: '30%' }} />
          <col span={1} style={{ width: '40%' }} />
          <col span={1} style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">관계</th>
            <th scope="col">목록 삭제</th>
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
                  <div className="delete_btn">
                    <Button type="button" onClick={handleDeleteFriend(data.id)}>
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default FriendList;
