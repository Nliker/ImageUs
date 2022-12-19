import styled from '@emotion/styled';

export const InfoTable = styled.table`
  table-layout: fixed;

  width: 100%;
  margin: 50px 0;
  font-size: 14px;

  text-align: center;
  border-collapse: collapse;

  tbody {
    tr {
      box-sizing: border-box;
      border-top: 1px solid black;
      &:last-of-type {
        border-bottom: 1px solid black;
      }
    }
    tr td,
    tr th {
      padding: 15px 0;
    }
  }
`;
