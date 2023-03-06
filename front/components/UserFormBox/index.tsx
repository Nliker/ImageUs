import React from 'react';
import { InnerContainer, OuterContainer, Wrapper } from './styles';

interface InputBoxProps {
  children?: React.ReactNode;
  pageName?: string;
}

const UserFormBox = ({ children, pageName }: InputBoxProps) => {
  return (
    <Wrapper>
      <OuterContainer>
        <h1>{pageName}</h1>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default UserFormBox;
