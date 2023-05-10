import { changeUserInfoFetcher } from '@utils/userDataFetcher';
import useSWRMutation from 'swr/mutation';
import { getErrorMessage } from '@utils/getErrorMessage';

function useUserData() {
  const { trigger: changeUserNameTrigger } = useSWRMutation(
    '/user/my',
    changeUserInfoFetcher,
  );

  const requestChangeName = async (nameValue: string) => {
    try {
      await changeUserNameTrigger({ name: nameValue });
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return {
    requestChangeName,
  };
}

export default useUserData;
