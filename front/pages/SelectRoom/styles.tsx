import styled from '@emotion/styled';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  box-sizing: border-box;

  .list_box {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    width: 100%;
    max-width: 800px;
  }

  header {
    position: relative;
    text-align: center;

    width: 80%;
    margin: auto;
    border-radius: 0 0 20px 20px;

    color: white;
    background-color: #2e2c3096;
    box-shadow: 0px 2px 4px 4px rgb(33 37 41 / 8%);

    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;

      .create_btn {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);

        height: 30px;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background-color: #d4d3d596;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    padding: 2rem 0;

    .list_box {
      width: 65%;

      border-radius: 20px;
      overflow: hidden;
      box-shadow: rgba(50, 50, 50, 0.1) 0px 16px 32px,
        rgba(0, 0, 0, 0.07) 0px 6px 16px;

      header {
        width: 100%;
        border-radius: 0%;
      }
    }
  }
`;
