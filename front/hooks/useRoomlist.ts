import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';

function useRoomlist() {
  // 유저 아이디는 전역적으로 props로 받아도 될듯함
  const userId = sessionStorage.getItem('user_id');
  const { data, mutate, error, isValidating } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
    refresh: mutate,
  };
}

export default useRoomlist;
