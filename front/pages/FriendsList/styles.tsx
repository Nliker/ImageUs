import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  h1,
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

export const Header = styled.header`
  div {
    padding: 28px 0;
    height: 105px;
    box-sizing: border-box;
  }
  h1 {
    margin-left: 2em;
  }
`;

export const ContentBox = styled.div`
  padding: 0 30px;
  table {
    width: 100%;
    position: relative;
    padding-bottom: 0;
    border: none;
    border-collapse: collapse;

    td,
    th {
      text-align: start;
      padding: 16px;
    }

    th {
      border-bottom: 1px solid #a39485;
    }

    tr:not(:last-of-type) td {
      border-bottom: 1px solid #e5e5e5;
    }
  }
`;

export const ContentList = styled.div`
  margin-top: 30px;
  border-radius: 12px;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
  background-color: white;

  overflow: hidden;
`;

export const SearchBox = styled.div`
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