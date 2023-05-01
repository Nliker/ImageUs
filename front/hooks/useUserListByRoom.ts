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
    await inviteFriendFetcher(`/room/${roomId}/user`, { arg: selectIdList });
    await userListMutate();
  };

  const kickOutMember = async (memberId: number, memberName: string) => {
    try {
      await deleteMemberFetcher(`/room/${roomId}/user`, { arg: memberId });
      alert(`${memberName}님을 강퇴하였습니다..`);
      await userListMutate();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return {
    userListByRoom,
    inviteMemberToRoom,
    kickOutMember,
  };
}

export default useUserListByRoom;
