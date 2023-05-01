import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;

  font-size: 1.4rem;

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

    padding-bottom: 40px;
  }
`;

export const Header = styled.header`
  margin-bottom: 5rem;

  div {
    width: 80%;
    height: 105px;
    margin: auto;

    h2 {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export const ContentBox = styled.div`
  position: relative;

  width: 80%;
  max-width: 850px;
  margin: auto;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

export const TabBox = styled.div`
  display: inline-block;
  position: absolute;
  top: -40px;
  left: 40px;

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

  width: 100%;
  min-height: 350px;
  border-top: 1px solid #a39485;

  background-color: white;

  table {
    position: relative;

    width: 100%;
    padding-bottom: 0;

    border: none;
    border-collapse: collapse;
    user-select: text;

    td,
    th {
      text-align: start;
      padding: 16px 0;
    }

    th {
      border-bottom: 1px solid #a39485;
    }

    tr td {
      border-bottom: 1px solid #e5e5e5;
    }
  }

  @media screen and (min-width: 850px) {
    border-radius: 10px;
    box-shadow: 0px 2px 7px -4px;
    border: none;

    table {
      td,
      th {
        padding: 16px;
      }
    }
  }
`;
