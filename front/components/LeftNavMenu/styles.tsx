import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const Wrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;

  transition: width 0.5s, opacity 0.4s;
  width: 15rem;

  background-color: #99aebb;

  ${({ show }) =>
    !show &&
    `
    width: 0;
    opacity: 0;
    `}

  .active_icon {
    display: flex;
    justify-content: end;

    padding: 0.5rem 0;

    .close_icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 0.5rem;

      cursor: pointer;
    }
  }

  .logo_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      color: white;
    }
  }

  .link_box {
    text-align: center;
    margin: 2.5rem 0;

    .room_link {
      display: inline-block;
      margin: 0 auto;
      padding: 0;

      border-radius: 0.25rem;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;

      .button_wrap {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

        height: 2rem;
        gap: 0.25rem;
        padding-left: 1rem;
        padding-right: 1rem;

        border-radius: 0.25rem;
        background-color: black;
        color: white;

        &:hover {
          background-color: #dadde2;
          color: rgb(46 48 48);
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    position: absolute;
    height: 100%;
    z-index: 1000;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 66px;
  box-shadow: 0 -2px 4px 0 rgb(33 37 41 / 8%);

  background-color: #fff;

  @media screen and (min-width: 1024px) {
    box-sizing: border-box;

    padding: 0 4rem;
    box-shadow: 0 2px 4px 0 rgb(33 37 41 / 8%);

    .home {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 150px;
      gap: 0.3rem;

      .nav_icon {
        width: 66px;
      }
    }

    .logout_icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 72px;

      cursor: pointer;

      &:hover {
        color: #f5642d;
      }
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 1024px) {
    justify-content: start;
    gap: 3rem;
    margin-left: 3rem;
  }
`;

export const NavItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 80px;

  height: 100%;

  list-style: none;
  box-sizing: border-box;

  .nav_link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 1;
  }

  &.link_item:hover {
    color: #0d6efd;
    background-color: #d4d3d596;
  }

  .nav_icon svg,
  .logout_icon svg {
    display: block;

    height: auto;
    margin: 0 auto 3px;
  }

  .logout_icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    cursor: pointer;

    &:hover {
      color: #f5642d;
      background-color: #d4d3d596;
    }
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
`;

export const UserIconBox = styled.div`
  position: relative;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba(212, 211, 213, 0.59);
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 50px;
    z-index: 10;

    width: 240px;

    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .intro {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      height: 80px;
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .link {
        margin-top: 10px;
        color: #065fd4;
        text-decoration: none;
      }
    }

    .logout {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 30px;

      color: black;
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: #dc3545;
      }
    }

    @media screen and (max-width: 500px) {
      top: 50px;
      left: -100px;
    }
  }
`;

export const Blind = css`
  clip: rect(0, 0, 0, 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
`;
