import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 300px;
  height: 200px;
  border-radius: 12px;
  padding: 40px 30px;

  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 0 15px 1px rgb(0 0 0 / 40%);

  & > p {
    text-align: center;

    margin: 0;
    font-size: 18px;
  }

  .btn_group {
    display: flex;
    justify-content: space-around;
  }
`;
