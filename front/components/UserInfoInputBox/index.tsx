import React from 'react';
import { NavLink } from 'react-router-dom';
import { InnerContainer, OuterContainer, Wrapper } from './styles';

interface InputBoxProps {
  children?: React.ReactNode;
  pageName?: string;
}

const UserInfoInputBox = ({ children, pageName }: InputBoxProps) => {
  // const { currentPage } = useParams<{ currentPage: string }>();
  //   const [checked, setChecked] = useState(false);

  //   const checkHandler = useCallback(() => {
  //     return setChecked((prev) => !prev);
  //   }, []);
  // console.log(currentPage);
  return (
    <Wrapper>
      <OuterContainer>
        <h1>로그인</h1>
        <InnerContainer>
          {children}
          {/* {pageName === 'login' ? (
            <MoveBox>
              <NavLink to={'/signup'}>계정 만들기</NavLink>
              <button type="submit">확인</button>
            </MoveBox>
          ) : (
            <MoveBox>
              <button type="submit">제출</button>
            </MoveBox>
          )} */}
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default UserInfoInputBox;
