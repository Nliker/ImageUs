import styled from '@emotion/styled';

export const InfoSection = styled.section`
  max-width: 800px;
  margin: auto;
  margin-top: 40px;
`;

export const InfoTable = styled.table`
  table-layout: fixed;

  width: 100%;
  font-size: 14px;
  border-radius: 15px;
  box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);

  text-align: center;
  border-collapse: collapse;
  background-color: white;
  overflow: hidden;

  tbody {
    tr td,
    tr th {
      padding: 15px 0;
    }

    tr {
      height: 5rem;
      .btn_group {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
    }

    th {
      border-right: 1px solid #a39485;
    }

    @media screen and (max-width: 600px) {
      .btn_group button {
        font-size: 0.65rem;
      }
    }
  }
`;
