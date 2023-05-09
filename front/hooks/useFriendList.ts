import { DFriendData } from '@typing/db';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  deleteFriendFetcher,
  getUserFdListFetcher,
} from '@utils/userDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

function useFriendList() {
  const { data: friendList, mutate: mutateFriendList } = useSWR<DFriendData[]>(
    'friendlist',
    getUserFdListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const { trigger: deleteFreindTrigger } = useSWRMutation(
    '/delete/friend',
    deleteFriendFetcher,
  );

  const deleteFriend = async (friendId: number) => {
    try {
      await deleteFreindTrigger(friendId);
    } catch (error) {
      const message = getErrorMessage(error);
      alert('친구 목록에서 삭제하지 못하였습니다..다시 시도해주세요');
      console.error(message);
    }
    await mutateFriendList();
  };

  return {
    friendList,
    totalFriendCount: friendList?.length,
    deleteFriend,
  };
}

export default useFriendList;
