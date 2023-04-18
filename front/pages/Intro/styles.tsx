import styled from '@emotion/styled';

// export const Wrappper = styled.div`
//   min-width: 370px;
//   height: 100%;
//   font-size: 0.85rem;

//   overflow: hidden;
// `;

// export const ContentWrappper = styled.div`
//   height: 100%;

//   main {
//     display: flex;

//     height: 100%;

//     section {
//       height: 100%;
//     }
//   }
// `;

export const MainContainer = styled.main`
  height: 100%;

  box-sizing: border-box;
`;

export const MainIntroduction = styled.section`
  height: 100%;

  .main_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    gap: 5rem;

    color: white;
    background-color: #080609;

    img {
      position: absolute;
      right: 0;

      height: 70%;
    }

    .btn_group {
      display: flex;
      position: relative;
      z-index: 1;

      gap: 5rem;
    }
  }

  .main_page_article {
    position: relative;
    z-index: 1;
  }

  .main_page_intro {
    text-align: center;

    margin: 0;
    font-size: 2.75rem;

    .brand_logo {
      color: #ecb22e;
    }
  }
`;
