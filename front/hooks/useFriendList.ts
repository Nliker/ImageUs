import { DFriendData } from '@typing/db';
import { getUserFdListFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';

function useFriendList() {
  const { data: friendList } = useSWR<DFriendData[]>(
    'friendlist',
    getUserFdListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    friendList,
    totalFriendCount: friendList?.length,
  };
}

export default useFriendList;
