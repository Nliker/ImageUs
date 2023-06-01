import styled from '@emotion/styled';

export const InfoSection = styled.section`
  margin: auto;
  max-width: 800px;
`;

export const InfoTable = styled.table`
  table-layout: fixed;

  width: 100%;
  font-size: 1.3rem;
  border-radius: 15px;
  box-shadow: -2px 2px 2px 2px rgb(0 0 0 / 40%);

  text-align: center;
  border-collapse: collapse;
  background-color: white;
  overflow: hidden;
  user-select: text;

  tbody {
    tr td,
    tr th {
      padding: 15px 0;
    }

    tr {
      height: 5rem;

      .btn_group {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;

        button {
          font-size: 0.65rem;
        }
      }

      .change_name {
        p {
          margin: 0;
          margin-bottom: 5px;
        }

        input {
          width: 130px;
        }
      }
    }

    th {
      border-right: 1px solid #a39485;
    }
  }

  @media screen and (min-width: 600px) {
    tbody {
      tr {
        .btn_group {
          flex-direction: row;
          button {
            font-size: 1rem;
          }
        }

        .change_name {
          input {
            width: 180px;
          }
        }
      }
    }
  }
`;
