import { getErrorMessage } from '@utils/getErrorMessage';
import {
  getUserListByRmFetcher,
  inviteFriendFetcher,
  deleteMemberFetcher,
} from '@utils/roomDataFetcher';
import useSWR from 'swr';

function useUserListByRoom(roomId: string) {
  const { data: userListByRoom, mutate: userListMutate } = useSWR(
    `/room/${roomId}/userlist`,
    getUserListByRmFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const inviteMemberToRoom = async (selectIdList: number[]) => {
    try {
      await inviteFriendFetcher(`/room/${roomId}/user`, { arg: selectIdList });
      await userListMutate();
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const kickOutMember = async (memberId: number) => {
    try {
      await deleteMemberFetcher(`/room/${roomId}/user`, { arg: memberId });
      await userListMutate();
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return {
    userListByRoom,
    inviteMemberToRoom,
    kickOutMember,
  };
}

export default useUserListByRoom;
