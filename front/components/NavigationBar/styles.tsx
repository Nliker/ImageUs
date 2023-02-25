import styled from '@emotion/styled';

export const Wrapper = styled.nav`
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
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

  height: 66px;
  width: 100%;
  box-shadow: 0 -2px 4px 0 rgb(33 37 41 / 8%);
  background-color: #fff;

  a {
    text-decoration: none;
    color: #47443e;
  }

  .user_icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    flex: 0.8;
    border-left: solid 1px #e4efef;

    .user_icon_d {
      position: relative;
      display: inline-block;

      width: 24px;
      height: 24px;

      .user_icon_s {
        display: inline-block;
        height: 100%;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    box-shadow: 0 2px 4px 0 rgb(33 37 41 / 8%);
  }
`;

export const MobileNavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;

  flex: 10;
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
    padding-left: 4rem;
  }
`;

export const MobileNavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  list-style: none;
  box-sizing: border-box;
  padding: 0.5rem 1rem;

  svg {
    display: block;
    margin: 0 auto 3px;
    width: 25px;
    height: auto;
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
  top: -153px;
  flex-direction: column;

  height: auto;
  right: -10px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);

  z-index: 1000;
  background-color: white;

  @media screen and (max-width: 1023px) {
    &::after {
      content: '';
      position: absolute;

      width: 0;
      height: 0;
      top: 100%;
      right: 0.9em;
      border: 0.75rem solid transparent;
      border-bottom: none;

      border-top-color: #fff;
      filter: drop-shadow(0 0.2rem 0.0625rem rgba(0, 0, 0, 0.1));
    }
  }

  @media screen and (min-width: 1024px) {
    top: 42px;
    right: -17px;

    &::before {
      content: '';
      position: absolute;

      width: 0;
      height: 0;
      bottom: 100%;
      right: 1.5em;
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
