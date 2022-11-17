import EachMember from '@components/EachMember';
import React, { useCallback, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { Collapse, Subtitle } from './styles';

const MemberList = () => {
  const [memberCollapse, setMemberCollapse] = useState<boolean>(false);
  // 임시 데이터
  const memberData = [
    {
      id: 1,
      name: '멤버1',
    },
    {
      id: 2,
      name: '멤버2',
    },
    {
      id: 3,
      name: '멤버3',
    },
    {
      id: 4,
      name: '멤버4',
    },
  ];

  const toggleMemberCollapse = useCallback(() => setMemberCollapse((prev) => !prev), []);
  return (
    <>
      <Subtitle>
        <Collapse collapse={memberCollapse} onClick={toggleMemberCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Members</span>
      </Subtitle>
      <div>
        {!memberCollapse &&
          memberData?.map((member) => {
            return <EachMember key={member.id} member={member} />;
          })}
      </div>
    </>
  );
};

export default MemberList;
