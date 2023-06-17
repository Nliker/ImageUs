import styled from '@emotion/styled';

export const MainContainer = styled.main`
  height: 100%;

  .main_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    min-width: 350px;
    min-height: 450px;

    background-color: #fff;

    .logo_text {
      font-family: 'Lobster';
      font-size: 3.5rem;
      margin: 0;
    }

    .btn_group {
      display: flex;

      margin-top: 8rem;
      gap: 5rem;
    }
  }
`;
