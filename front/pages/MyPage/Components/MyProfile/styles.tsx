import styled from '@emotion/styled';

export const InfoSection = styled.section`
  min-width: 370px;

  h2 {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 450px) {
    margin: 0 2rem;
  }
`;

export const InfoTable = styled.table`
  width: 100%;
  table-layout: fixed;

  text-align: center;
  border-collapse: collapse;
  overflow: hidden;
  user-select: text;

  tbody {
    border-top: 3px solid #000000;

    tr td,
    tr th {
      padding: 15px;
    }

    tr {
      height: 5rem;

      text-align: left;
      border-bottom: 1px solid #f1f1f1;

      .change_name {
        display: flex;
        align-items: center;

        .notice {
          margin: 0;
          margin-bottom: 5px;
        }

        input {
          width: 130px;
        }

        .btn_group {
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;

          margin-left: auto;
          gap: 1rem;
        }
      }
    }
  }

  @media screen and (min-width: 600px) {
    tbody {
      tr {
        .change_name {
          .btn_group {
            flex-direction: row;
          }
        }
      }
    }
  }
`;
