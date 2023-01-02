import EachMember from '@components/EachMember';
import React, { memo, useCallback, useState } from 'react';
import useSWR from 'swr';
import { IoMdArrowDropright } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { Collapse, Subtitle } from './styles';
import { getUserListFetcher } from '@utils/roomDataFetcher';
import { IFriendData } from '@typing/db';

const MemberList = memo(({ roomId }: { roomId: string }) => {
  // const { roomId } = useParams<{roomId?: string}>();
  // console.log(roomId);
  // const { data: roomId } = useSWR('roomId');
  const { data: userlist } = useSWR(['userlist', roomId], getUserListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [memberCollapse, setMemberCollapse] = useState<boolean>(false);

  const toggleMemberCollapse = useCallback(() => setMemberCollapse((prev) => !prev), []);
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
