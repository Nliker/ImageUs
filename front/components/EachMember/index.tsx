import { IFriendData } from '@typing/db';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MemberDiv } from './styles';

const EachMember = ({ member }: {member: IFriendData}) => {
  return (
    <MemberDiv>
      <span># {member.name}</span>
    </MemberDiv>
    // <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
    // </NavLink>
  );
};

export default EachMember;
