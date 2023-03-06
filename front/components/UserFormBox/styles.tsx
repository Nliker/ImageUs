import styled from '@emotion/styled';

export const Wrapper = styled.div`
  @media screen and (min-width: 601px) {
    position: relative;
    display: flex;
    flex-direction: column;

    min-height: 100vh;

    &:before,
    &:after {
      display: block;
      flex-grow: 1;

      height: 18px;
      box-sizing: border-box;

      content: '';
    }
  }
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;

  padding: 24px 24px 36px;

  @media screen and (min-width: 450px) {
    padding: 48px 40px 36px;
  }

  @media screen and (min-width: 601px) {
    display: block;

    width: 450px;
    margin: 0 auto;

    border: 1px solid #dadce0;
    border-radius: 8px;
  }
`;

export const InnerContainer = styled.div`
  padding-top: 30px;
`;
