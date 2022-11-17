import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChannelDiv } from './styles';

interface Channel {
  channel: {
    id: number;
    name: string;
  };
}

const EachChannel = ({ channel }: Channel) => {
  return (
    <ChannelDiv>
      <span># {channel.name}</span>
    </ChannelDiv>
    // <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
    // </NavLink>
  );
};

export default EachChannel;
