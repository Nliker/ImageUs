import styled from '@emotion/styled';

export const WrapperBox = styled.section`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  height: 100%;
  box-sizing: border-box;

  overflow-x: hidden;

  .nav_box {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    width: 100%;
    padding: 0.5rem 9rem;
    box-sizing: border-box;

    .goback_room_btn {
      display: flex;
      align-items: center;

      gap: 0.5rem;

      border: 1px solid black;
      border-radius: 6px;
      background-color: darkgray;
      text-decoration: none;
    }
  }
`;

export const ContentBox = styled.div`
  box-sizing: border-box;

  height: 100%;

  overflow: hidden;

  h2,
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }

  .nav_icon {
    position: absolute;
    left: 1.5rem;
    top: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;

    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: rgba(212, 211, 213, 0.59);
    }
  }

  .upload_image {
    text-align: center;
    margin-bottom: 50px;
  }

  .content {
    margin-top: 2rem;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 150px;
  padding-left: 5rem;
  margin-top: 3rem;
  gap: 1rem;

  .user_name {
    font-size: 2rem;
    font-weight: bolder;
  }

  ul {
    display: flex;
    gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    align-items: center;

    padding: 0;

    ul {
      flex-direction: column;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;

  margin: 3rem 0;
  padding: 0 2rem;
`;
