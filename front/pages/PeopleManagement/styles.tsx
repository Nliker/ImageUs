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

export const TabBox = styled.div`
`;

