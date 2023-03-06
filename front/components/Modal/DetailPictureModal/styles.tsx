import styled from '@emotion/styled';

export const Wrapper = styled.div<{
  modalSize: {
    modalWidth: string;
    modalHeight: string;
  };
}>`
  position: relative;
  display: flex;
  flex-direction: column;

  width: ${(props) => props.modalSize.modalWidth}px;
  height: ${(props) => props.modalSize.modalHeight}px;
  border-radius: 12px;
  box-shadow: 0 0 15px 1px rgb(0 0 0 / 40%);

  overflow: hidden;
  background-color: white;

  .head_info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 30px;
    width: 100%;
    font-size: 80%;

    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;

    & > span {
      color: black;
    }

    .writer {
      font-size: 1.3rem;
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

      height: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    width: 300px;
    height: 400px;

    .head_info {
      .writer {
        font-size: 1.2rem;
      }
      .name_info {
        gap: 0.2rem;
      }
    }
  }
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 70%;
`;

export const InfoSection = styled.div`
  box-sizing: border-box;

  padding: 20px;
  flex-basis: 50%;
`;
