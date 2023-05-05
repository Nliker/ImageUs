import useSWR from 'swr';
import {
  changeUserInfoFetcher,
  getUserImgLenFetcher,
} from '@utils/userDataFetcher';
import useSWRMutation from 'swr/mutation';

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

  const { trigger: changeUserNameTrigger } = useSWRMutation(
    '/user/my',
    changeUserInfoFetcher,
  );

  const requestChangeName = async (nameValue: string) =>
    await changeUserNameTrigger({ name: nameValue });

  return {
    totalImageCount,
    requestChangeName,
  };
}

export default useUserData;
