import { DFriendData } from '@typing/db';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  addFriendFetcher,
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

  const { trigger: registerFriendTrigger } = useSWRMutation(
    '/user/friend',
    addFriendFetcher,
  );

  const { trigger: deleteFreindTrigger } = useSWRMutation(
    '/delete/friend',
    deleteFriendFetcher,
  );

  const registerFriend = async (friendId: number) => {
    try {
      await registerFriendTrigger(friendId);
    } catch (error) {
      const message = getErrorMessage(error);
      alert('친구 목록에 추가하지 못하였습니다..다시 시도해주세요');
      console.error(message);
    }
    await mutateFriendList();
  };

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
    registerFriend,
    deleteFriend,
  };
}

export default useFriendList;
