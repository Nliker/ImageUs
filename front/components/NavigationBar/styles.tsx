import styled from '@emotion/styled';

export const Wrapper = styled.nav`
  display: block;
  position: fixed;
  bottom: 0;
  z-index: 100;

  width: 100%;
  min-width: 330px;
  font-size: 1.1rem;

  h1 {
    margin: 0;
  }

  @media screen and (min-width: 1024px) {
    position: static;
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
      font-size: 2rem;

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
    gap: 4rem;
    margin-left: 1.5rem;
  }
`;

export const NavItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 72px;
  height: 100%;

  list-style: none;
  box-sizing: border-box;

  &.link_item:hover {
    color: #0d6efd;
  }

  .nav_icon svg,
  .logout_icon svg {
    display: block;

    height: auto;
    margin: 0 auto 3px;
  }

  .nav_link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 1;
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
    }
  }

  @media screen and (min-width: 1024px) {
    font-size: 1.3rem;
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
