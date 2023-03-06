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

  .content_wrapper {
    position: relative;
    right: 3px;

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

  width: fit-content;
  margin: auto;

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

  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;

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

  width: calc(100vw - 20px);
  min-width: 560px;
  border-top: 1px solid #a39485;

  background-color: white;

  @media screen and (min-width: 850px) {
    max-width: 800px;
    border-radius: 15px;
    box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);
  }
`;
