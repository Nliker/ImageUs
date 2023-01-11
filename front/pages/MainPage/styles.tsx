import styled from '@emotion/styled';

// export const ProfileModal = styled.div``;

// export const LogOutButton = styled.button``;

export const Wrappper = styled.div`
  font-size: 0.85rem;
`;

export const ContentWrappper = styled.div`
  height: calc(100vh - 85px);
`;

export const MainIntroduction = styled.section`
  padding: 6rem 0;

  h1 {
    text-align: center;

    font-size: 2.75rem;

    .brand_logo {
      color: #ecb22e;
    }
  }

  // .action_box {
  //   display: flex;
  //   justify-content: center;
  //   gap: 3rem;
  // }
`;

export const MainRoomList = styled.div`
  text-align: center;

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      cursor: pointer;
    }
  }
`;
