import styled from '@emotion/styled';

export const WrapperBox = styled.section`
  display: flex;
  flex-direction: column;

  height: 100%;
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

  .upload_image {
    text-align: center;
    margin-bottom: 50px;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem 0;
`;

export const EachRoomPictureList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
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
  font-size: 1.5rem;

  a.menu_active {
    border-top: 1px solid rgb(38, 38, 38);
  }
`;

export const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 30px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 50%;

  gap: 1rem;

  h2.user_name {
    font-size: 2rem;
  }

  ul {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 600px) {
    ul {
      flex-direction: column;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 85%;
  margin: auto;
  font-size: 1.2rem;
`;
