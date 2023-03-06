import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isImageRoom?: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ isImageRoom }) =>
    isImageRoom ? 'space-between' : 'end'};
  align-items: center;

  height: 40px;
  padding: 0 30px;

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

  &::before {
    background-color: #f1f3f5;
    bottom: -1px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  @media screen and (min-width: 1024px) {
    justify-content: end;
  }
`;

export const LogInBtnBox = styled.div`
  display: flex;

  gap: 1rem;
  button.success {
    font-size: 0.8rem;
  }
`;

export const IconBox = styled.div`
  display: flex;
`;

export const RightIcons = styled.div`
  position: relative;
`;

export const LeftIcon = styled.div`
  position: relative;

  gap: 2rem;

  @media screen and (min-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }
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

  z-index: 1000;
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
  min-width: 14rem;

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

    gap: 0.5rem;
    margin-left: 10px;

    user-select: text;
  }
`;

export const LogoutBtn = styled.div`
  text-align: center;

  margin-top: 20px;

  cursor: pointer;
`;

export const LeaveBox = styled.div`
  position: absolute;
  top: 48px;
  left: 24px;
  text-align: center;

  width: 8rem;
  padding: 3px 0;
  border-radius: 5px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%),
    0 0.0625rem 0.125rem rgb(0 0 0 / 20%);

  z-index: 1000;
  background-color: white;

  &::before {
    content: '';
    position: absolute;

    width: 0;
    height: 0;
    bottom: 100%;
    right: 4.5em;
    border: 0.75rem solid transparent;
    border-top: none;

    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }

  .leave_room {
    margin: 0;
    padding: 8px;

    cursor: pointer;

    &:hover {
      color: white;
      background-color: #dc3545;
    }
  }
`;
export const LeaveRoom = styled.div``;
