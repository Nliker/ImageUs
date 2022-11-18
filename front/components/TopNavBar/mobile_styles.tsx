import styled from '@emotion/styled';

export const MobileContainer = styled.div`
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  a {
    text-decoration: none;
    color: #47443e;
  }
`;

export const TopContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding h1 {
    margin: 0;
  }
`;

// export const BottomContainer = styled.div`
//   display: block;
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   z-index: 100;
// `;

// export const MobileNavList = styled.ul`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   height: 100%;
//   margin: 0;
//   padding: 0;
// `;

// export const MobileNavItem = styled.li`
//   display: flex;
//   align-items: center;
//   height: 100%;
//   list-style: none;
//   box-sizing: border-box;
//   padding: 0.5rem 1rem;
//   a {
//     border-radius: 5px;
//     svg {
//       display: block;
//       margin: 0 auto 3px;
//       width: 30px;
//       height: auto;
//     }
//     &:hover {
//       background-color: #d6d6d6;
//     }
//   }
// `;

export const MobileBtnDiv = styled.div`
    height: 23px;
`;

export const MobileButton = styled.span`
  width: 23px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 23px;
    height: auto;
  }
`;
