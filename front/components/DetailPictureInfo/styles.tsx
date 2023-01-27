import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  width: calc(100% - 100px);
  height: 500px;

  border-radius: 12px;

  background-color: white;
`;

export const ImageSection = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;

  img {
    width: 100%;
  }
`;

export const InfoSection = styled.div`
  box-sizing: border-box;

  padding: 20px;
  flex-basis: 50%;
`;
