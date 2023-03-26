import styled from '@emotion/styled';

export const Wrapper = styled.nav`
  display: block;
  position: fixed;
  bottom: 0;
  z-index: 100;

  width: 100%;
  min-width: 330px;
  font-size: 0.75rem;

  h1 {
    margin: 0;
  }

  @media screen and (min-width: 1024px) {
    position: static;
  }
`;

export const BottomContainer = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 66px;
  box-shadow: 0 -2px 4px 0 rgb(33 37 41 / 8%);

  background-color: #fff;

  a {
    text-decoration: none;
    color: #47443e;
  }

  .user_icon_d {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 70px;
    border-left: 1px solid #dddddd;

    cursor: pointer;

    &:hover {
      svg {
        color: #f5642d;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    box-sizing: border-box;

    padding: 0 4rem;
    box-shadow: 0 2px 4px 0 rgb(33 37 41 / 8%);

    .user_icon_d {
      border-right: 1px solid #dddddd;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: calc(100% - 66px);
  height: 100%;
  margin: 0;
  padding: 0;

  .navigate_link:hover,
  .nav_item:hover {
    color: #0d6efd;
  }

  @media screen and (min-width: 1024px) {
    justify-content: start;

    gap: 4rem;
  }
`;

export const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  height: 100%;

  list-style: none;
  box-sizing: border-box;

  &:last-of-type {
  }

  svg {
    display: block;

    width: 25px;
    height: auto;
    margin: 0 auto 3px;
  }

  h1 {
    a {
      display: flex;
      gap: 0.5rem;

      svg {
        margin: 0 auto;
      }
    }
  }

  .upload_btn {
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    font-size: 0.8rem;
  }
`;

export const UserBox = styled.div`
  position: absolute;
  top: -133px;
  flex-direction: column;
  z-index: 1000;

  height: auto;
  right: 12px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);

  background-color: white;
  cursor: default;

  @media screen and (max-width: 1023px) {
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      right: 0.9em;

      width: 0;
      height: 0;
      border: 0.75rem solid transparent;
      border-bottom: none;

      border-top-color: #fff;
      filter: drop-shadow(0 0.2rem 0.0625rem rgba(0, 0, 0, 0.1));
    }
  }

  @media screen and (min-width: 1024px) {
    top: 67px;
    right: 67px;

    &::before {
      content: '';
      position: absolute;
      right: 1.5em;
      bottom: 100%;

      width: 0;
      height: 0;
      border: 0.75rem solid transparent;
      border-top: none;

      border-bottom-color: #fff;
      filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
    }
  }
`;

export const UserInfo = styled.div`
  p {
    margin: 0;
    white-space: nowrap;
  }

  .info_words {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    gap: 0.5rem;
    margin-left: 10px;

    user-select: text;
  }
`;

export const LogoutBtn = styled.div`
  text-align: center;

  margin-top: 20px;

  button {
    font-size: 80%;
  }
`;
