import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { DFriendData } from '@typing/db';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  addFriendFetcher,
  deleteFriendFetcher,
  getUserFdListFetcher,
} from '@utils/userDataFetcher';

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
      await mutateFriendList();
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const deleteFriend = async (friendId: number) => {
    try {
      await deleteFreindTrigger(friendId);
      await mutateFriendList();
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return {
    friendList,
    totalFriendCount: friendList?.length,
    registerFriend,
    deleteFriend,
  };
}

export default useFriendList;
