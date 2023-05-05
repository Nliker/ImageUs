import useSWR from 'swr';
import {
  changeUserInfoFetcher,
  getUserImgLenFetcher,
} from '@utils/userDataFetcher';
import useSWRMutation from 'swr/mutation';

function useUserData(userId: string) {
  const { trigger: changeUserNameTrigger } = useSWRMutation(
    '/user/my',
    changeUserInfoFetcher,
  );

  const requestChangeName = async (nameValue: string) =>
    await changeUserNameTrigger({ name: nameValue });

  return {
    requestChangeName,
  };
}

export default useUserData;
