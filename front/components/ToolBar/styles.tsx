import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: rgb(0 0 0 / 10%) 2px 0px 2px;
  div {
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
  & > div:first-of-type {
    margin-right: 20px;
  }
`;

export const LeftIcon = styled.div`
  flex-basis: 50%;
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
