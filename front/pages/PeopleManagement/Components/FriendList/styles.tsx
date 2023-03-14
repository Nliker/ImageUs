import styled from '@emotion/styled';

export const Wrapper = styled.div`
  table {
    white-space: nowrap;
  }

  table tbody tr {
    height: 100px;
  }

  table tr th,
  table tbody td {
    text-align: center;
  }
  @media screen and (max-width: 850px) {
    .delete_btn button {
      width: 53px;
      font-size: 0.65rem;
    }
  }
`;
