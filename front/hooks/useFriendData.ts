import { getUserFriendList } from '@utils/userDataFetcher';
import useSWR from 'swr';

function useFriendData() {
  const { data: friendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    friendNumber: friendList?.length,
  };
}

export default useFriendData;
