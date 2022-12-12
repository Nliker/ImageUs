import styled from '@emotion/styled';

export const Wrapper = styled.div`
  form {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    height: 60px;
    padding: 0 20px;
    border-radius: 30px;

    background: #fff;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 19%);
    .search_btn {
      padding-left: 10px;
      button {
        width: 50px;
      }
    }
  }

  form .search_input {
    width: 100%;
    margin-left: 10px;

    label {
      position: absolute;
      display: block;

      z-index: 100;

      font-size: 12px;
      font-weight: bold;
    }
    input {
      width: 100%;
      border: 0;
      padding: 20px 0 0;
    }
    input:focus {
      outline: none;
    }
  }
`;

export const SearchResult = styled.div`

`;