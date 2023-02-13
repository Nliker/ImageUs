import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: calc(100% - 40px);

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

  .content_wrapper {
    padding-bottom: 40px;
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
  display: flex;
  flex-direction: column;
  align-items: center;

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

    tr td {
      border-bottom: 1px solid #e5e5e5;
    }
  }
`;

export const TabBox = styled.div`
  position: relative;
  top: 18px;
  right: 130px;
  z-index: 1;

  ul {
    display: inline-flex;
    gap: 1rem;

    li {
      text-align: center;
      line-height: 45px;
    }

    a {
      display: block;

      width: 100px;
      height: 60px;
      border-radius: 15px;

      color: #111;
      box-sizing: border-box;
      background-color: #ccc;
      box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);
    }

    a.active_tab {
      color: black;
      background-color: white;
      box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);
    }
  }
`;

export const TabContent = styled.div`
  position: relative;
  z-index: 10;

  min-width: 561px;
  max-width: 800px;
  height: 400px;
  margin: auto;

  background-color: white;
  border-radius: 15px;
  box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);
`;
