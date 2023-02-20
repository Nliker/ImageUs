import styled from '@emotion/styled';

export const WrapperBox = styled.section`
  display: flex;
  flex-direction: column;

  height: calc(100% - 40px);
  /* padding-bottom: 30px; */
  box-sizing: border-box;

  overflow-x: hidden;
`;

export const ContentBox = styled.main`
  box-sizing: border-box;

  padding: 0 2rem;

  overflow: hidden;

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
  justify-content: center;

  padding: 2rem 0 4rem 0;
`;

export const EachRoomPictureList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 40px;

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
  font-size: 1.1rem;

  a.menu_active {
    border-top: 1px solid rgb(38, 38, 38);
  }
`;

export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 30px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 50%;

  gap: 1rem;

  ul {
    display: flex;
    gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    ul {
      flex-direction: column;
    }
  }
`;
