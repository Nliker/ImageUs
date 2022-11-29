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
  display: flex;
  gap: 1rem;
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
