import EachMember from '@components/EachMember';
import React, { memo, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IoMdArrowDropright } from 'react-icons/io';
import { Collapse, Subtitle } from './styles';
import { getUserListFetcher } from '@utils/roomDataFetcher';
import { IFriendData } from '@typing/db';

const MemberList = memo(({ roomId }: { roomId?: string }) => {
  const { data: userlist, mutate: userlistMutate } = useSWR(['userlist', roomId], getUserListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [memberCollapse, setMemberCollapse] = useState<boolean>(false);

  useEffect(() => {
    if (!roomId) return;
    userlistMutate();
  }, [roomId]);

  const toggleMemberCollapse = useCallback(() => setMemberCollapse((prev) => !prev), []);

  // console.log('멤버리스트 룸아이디:', roomId, userlist);

  return (
    <>
      <Subtitle onClick={toggleMemberCollapse}>
        <Collapse collapse={memberCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Members</span>
      </Subtitle>
      <div>
        {memberCollapse &&
          userlist?.map((member: IFriendData) => {
            return <EachMember key={member.id} member={member} />;
          })}
      </div>
    </>
  );
});

export default MemberList;
