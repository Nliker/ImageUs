import styled from '@emotion/styled';

export const Wrapper = styled.div`
  min-width: 500px;

  border: none;
  overflow: hidden;

  table {
    width: 100%;
    margin: auto;

    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
      background-color: #8c9cb2;
      color: white;

      tr {
        height: 50px;

        border-bottom: 1px solid #f1f1f1;

        th {
          padding: 1rem;
        }
      }
    }

    tbody {
      tr {
        height: 100px;

        border-bottom: 1px solid #f1f1f1;
      }
    }
  }

  @media screen and (min-width: 550px) {
    margin: 0 2rem;

    border: 1px solid #f1f1f1;
    border-radius: 10px;
  }
`;
