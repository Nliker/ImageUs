import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  border-radius: 12px;
  box-shadow: 0 0 15px 1px rgb(0 0 0 / 40%);

  background-color: white;

  .head_info {
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 20px;

    padding: 0 30px;
    width: 100%;

    box-sizing: border-box;
    text-align: center;

    & > span {
      color: black;
    }

    .writer {
      font-size: 1.5rem;
    }

    .name_info {
      display: flex;

      gap: 10px;
      height: 100%;
    }

    .date_info {
      display: flex;
      align-items: center;

      height: 100%;
    }
  }
`;

export const ImageSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-basis: 50%;

  img {
    width: 100%;
  }
`;

export const InfoSection = styled.div`
  box-sizing: border-box;

  padding: 20px;
  flex-basis: 50%;
`;
