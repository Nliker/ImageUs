import styled from '@emotion/styled';

export const Wrapper = styled.div`
  table tr th,
  table tbody td {
    text-align: center;
  }

  table tbody tr {
    height: 100px;
  }

  @media screen and (max-width: 850px) {
    .delete_btn button {
      width: 53px;
      font-size: 0.65rem;
    }
  }
`;
