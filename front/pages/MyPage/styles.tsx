import styled from '@emotion/styled';

export const WrapperBox = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const ContentBox = styled.main`
  padding: 2rem;
  h2,
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
`;

export const EachRoomPictureList = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:active {
      color: black;
    }
  }
`;

export const SubMenu = styled.div`
  display: flex;
  gap: 1rem;
  a.menu_active {
    border-top: 1px solid rgb(38, 38, 38);
  }
`;

export const ProfileImage = styled.div`
  margin-right: 30px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  margin-bottom: 44px;
  ul {
    display: flex;
    gap: 1rem;
  }
`;
