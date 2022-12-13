import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  h1,
  h2,
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    color: black;
    text-decoration: none;

    &:active {
      color: black;
    }
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

export const TabBox = styled.div`
  ul {
    display: inline-flex;
    gap: 0.75em;
    a {
      display: block;

      height: 50px;

      color: white;
      box-sizing: border-box;
      border-radius: 15px;
      background-color: #343436;
    }
  }
  a.active_tab {
    color: black;
    background-color: #fff;
  }
`;

export const TabContent = styled.div`
  position: absolute;
  z-index: 1000;

  width: calc(100% - 60px);
  margin-top: -20px;

  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgb(0 0 0 / 40%);

  overflow: hidden;
`;
