import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  background-color: white;

  & > p {
    margin: 0;

    text-align: center;
    white-space: nowrap;
  }

  .btn_group {
    display: flex;
    justify-content: space-around;
  }
`;
