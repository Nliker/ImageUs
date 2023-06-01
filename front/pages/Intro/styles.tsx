import styled from '@emotion/styled';

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
    gap: 3.5rem;

    color: white;
    background-color: #dbf2ff;

    img {
      height: 25%;
      max-height: 300px;
    }

    .main_logo {
      position: relative;
      right: 20px;
      display: flex;
      align-items: center;

      gap: 1rem;
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
    font-family: 'ShoCardCaps';
    font-size: 14vmin;
    color: #a5b8ce;

    .brand_logo {
      color: #ecb22e;
    }
  }
`;
