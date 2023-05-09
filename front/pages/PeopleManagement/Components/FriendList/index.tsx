import React, { useCallback } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { DFriendData } from '@typing/db';
import { Button } from '@styles/Button';
import { Wrapper } from './styles';
import {
  getUserFdListFetcher,
  deleteFriendFetcher,
} from '@utils/userDataFetcher';
import useFriendList from '@hooks/useFriendList';
import { getErrorMessage } from '@utils/getErrorMessage';
import useModal from '@hooks/useModal';

const FriendList = () => {
  // const { data: friendListData, mutate: friendListMutate } = useSWR<
  //   DFriendData[]
  // >('friendlist', getUserFdListFetcher, {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  // });
  // const { trigger } = useSWRMutation('deleteFriend', deleteFriendFetcher);
  const { showAlertModal } = useModal();
  const { friendList, deleteFriend } = useFriendList();

  const handleDeleteFriend =
    (friendData: DFriendData) =>
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const executeWork = async () => {
        try {
          await deleteFriend(friendData.id);
          alert('친구 목록에서 삭제하였습니다!');
        } catch (error) {
          const message = getErrorMessage(error);
          alert(message);
        }
      };
      showAlertModal({
        text: `${friendData.name}을 친구목록에서 삭제하시겠습니까?`,
        executeWork,
      });
    };

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col span={1} style={{ width: '15%' }} />
          <col span={1} style={{ width: '40%' }} />
          <col span={1} style={{ width: '25%' }} />
          <col span={1} style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">가입 유형</th>
            <th scope="col">목록 삭제</th>
          </tr>
        </thead>
        <tbody>
          {friendList?.length !== 0 ? (
            friendList?.map((data: DFriendData) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.user_type}</td>
                <td>
                  <div className="delete_btn">
                    <Button type="button" onClick={handleDeleteFriend(data)}>
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>등록된 친구가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default FriendList;
