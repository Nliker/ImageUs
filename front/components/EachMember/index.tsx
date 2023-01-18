import { DFriendData } from '@typing/db';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MemberDiv } from './styles';

const EachMember = ({ member }: { member: DFriendData }) => {
  return (
    <MemberDiv>
      <span># {member.name}</span>
    </MemberDiv>
    // <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
    // </NavLink>
  );
};

export default EachMember;
