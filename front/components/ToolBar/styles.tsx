import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 40px;
  margin: 0 30px;

  .toolbar_icon {
    display: flex;
    align-items: center;
    span {
      height: 25px;
      display: block;
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
`;

export const RightIcons = styled.div`
  position: absolute;
  right: 0;

  gap: 1rem;
`;

export const LeftIcon = styled.div`
  // flex-basis: 50%;
`;

export const UserBox = styled.div`
  position: absolute;
  top: 48px;
  flex-direction: column;

  height: auto;
  right: -23px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);

  z-index: 1;
  background-color: white;

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
`;

export const UserInfo = styled.div`
  display: flex;

  p {
    margin: 0;
    span {
      font-weight: bold;
    }
  }

  img {
    width: 50px;
  }

  .info_words {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-left: 10px;
  }
`;

export const LogoutBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;

  height: 40px;

  span {
    cursor: pointer;
  }
`;

export const SettingBox = styled.div`
  position: absolute;
  top: 48px;
  flex-direction: column;

  height: auto;
  right: 17px;
  padding: 20px 0;
  border-radius: 12px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);

  z-index: 1;
  background-color: white;

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

  .leave_room {
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }
`;
export const LeaveRoom = styled.div``;
