import styled from '@emotion/styled';

export const Wrapper = styled.header`
  user-select:none;
`;

export const DesktopContainer = styled.div`
  height: 64px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  text-align: center;
  background: #350d36;
  color: #ffffff;
  background-color: white;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  a {
    text-decoration: none;
    color: #47443e;
  }
  h1 {
    color: black;
    margin: 0;
    a {
      display: flex;
      align-items: center;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-left: 20px;
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
      width: 30px;
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
