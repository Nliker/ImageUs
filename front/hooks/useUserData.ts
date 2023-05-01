import useSWR from 'swr';
import { getUserImgLenFetcher } from '@utils/userDataFetcher';

function useUserData(userId: string) {
  const { data: totalImageCount } = useSWR<number>(
    `/user/${userId}/imagelist-len`,
    getUserImgLenFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    totalImageCount,
  };
}

export default useUserData;
