import React from 'react';
import { NavLink } from 'react-router-dom';
import { MemberDiv } from './styles';

interface Member {
  member: {
    id: number;
    name: string;
  };
}

const EachMember = ({ member }: Member) => {
  return (
    <MemberDiv>
      <span># {member.name}</span>
    </MemberDiv>
    // <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
    // </NavLink>
  );
};

export default EachMember;
