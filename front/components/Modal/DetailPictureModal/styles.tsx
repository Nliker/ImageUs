import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100%;

  overflow: hidden;
  background-color: white;

  .head_info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 30px;

    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0px 1px 2px -1px rgb(0 0 0 / 40%);

    & > span {
      color: black;
    }

    .writer {
      font-weight: bolder;
    }

    .name_info {
      display: flex;
      align-items: center;

      gap: 2rem;
    }

    .date_info {
      display: flex;
      align-items: center;

      gap: 1rem;

      .down_btn {
        width: 30px;
        height: 30px;

        & > a {
          display: inline-block;
          height: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    /* width: 300px;
    height: 400px; */

    .head_info {
      .name_info {
        gap: 0.2rem;
      }
    }
  }
`;

export const ImageSection = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  height: calc(100% - 60px);
  padding: 1.2rem;
`;

export const InfoSection = styled.div`
  box-sizing: border-box;

  padding: 20px;
  flex-basis: 50%;
`;
