import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: rgb(0 0 0 / 10%) 2px 0px 2px;
  .toolbar_icon {
    display: flex;
    align-items: center;
    height: 100%;
    span {
      height: 20px;
      display: block;
      line-height: 16px;
      cursor: pointer;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const RightIcons = styled.div`
  flex-basis: 50%;
  justify-content: flex-end;
  margin-right: 26px;
  & > div:first-of-type {
    margin-right: 20px;
  }
`;

export const LeftIcon = styled.div`
  flex-basis: 50%;
`;

export const UserBox = styled.div`
  position: absolute;
  flex-direction: column;
  height: auto;
  right: 20px;
  top: 45px;
  padding: 20px;
  background-color: white;
  z-index: 1;
  border-radius: 12px;
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%), 0 0.0625rem 0.125rem rgb(0 0 0 / 20%);
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

// export const SideBarButton = styled.span`
//   width: 23px;
//   align-items: center;
//   display: inline-flex;
//   justify-content: center;
//   cursor: pointer;
//   svg {
//     width: 23px;
//     height: auto;
//   }
// `;

// export const BtnSpan = styled.span`
//   width: 23px;
//   align-items: center;
//   display: inline-flex;
//   justify-content: center;
//   cursor: pointer;
//   svg {
//     width: 23px;
//     height: auto;
//   }
// `;
