import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;

  p {
    margin: 0;
  }

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
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 19%);

    .search_btn {
      padding-left: 10px;

      button {
        width: 60px;
        font-size: 0.5rem;
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
      &::placeholder {
        color: transparent;
      }
    }
  }
`;

export const InputBox = styled.div`
  margin: 0 40px;
`;

export const PreviewBox = styled.div`
  position: absolute;

  width: calc(100% - 180px);
  margin-left: 20px;

  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 30%) 0px 8px 12px 0px;
  background-color: white;

  ul li {
    padding: 10px 0;

    .search_result_space {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span:first-of-type {
        margin-bottom: 5px;
      }
    }
  }

  ul li.preview_li {
    &:hover {
      background-color: #f7f7f9;
      cursor: pointer;
    }
  }
`;

export const SearchResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;

  width: 100%;
  margin-top: 30px;

  .search_result_box {
    align-self: flex-start;

    ul {
      margin-top: 20px;
    }
  }

  .search_result {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 1.5rem;
    margin-top: 15px;

    button {
      font-size: 0.8rem;
    }
  }

  .not_found {
    text-align: center;

    .not_found_text {
      margin-top: 20px;
    }
  }
`;
