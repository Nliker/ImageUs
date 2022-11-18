import styled from '@emotion/styled';

export const Wrapper = styled.nav`
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  font-size: 0.75rem;
`;

export const BottomContainer = styled.div`
  height: 55px;
  width: 100%;
  box-shadow: 0 -2px 4px 0 rgb(33 37 41 / 8%);
  background-color: #fff;
  a {
    text-decoration: none;
    color: #47443e;
  }
`;

export const MobileNavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const MobileNavItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  list-style: none;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  &>a {
    border-radius: 5px;
    svg {
      display: block;
      margin: 0 auto 3px;
      width: 25px;
      height: auto;
    }
    &:hover {
      background-color: #d6d6d6;
    }
  }

  h1 {
    margin: 0;
  }
`;
