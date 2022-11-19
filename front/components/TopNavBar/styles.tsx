import styled from '@emotion/styled';

export const Wrapper = styled.header`
  user-select:none;
`;

export const DesktopContainer = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;

  height: 55px;
  // padding: 0 40px;

  background: #350d36;
  color: #ffffff;
  background-color: white;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  font-size: 0.75rem;

  a {
    text-decoration: none;
    color: #47443e;
  }
  h1 {
    flex: 1;
    margin: 0;
    color: black;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex: 6;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  // margin-left: 20px;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  list-style: none;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  a {
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
`;

export const ProfileIconWrapper = styled.div`
  padding: 0 16px;
`;

export const ProfileModal = styled.div``;

export const LogOutButton = styled.button``;
