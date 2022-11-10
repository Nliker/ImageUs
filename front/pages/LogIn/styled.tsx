import styled from '@emotion/styled';

export const Wrapper = styled.div`
  text-align: center;
  @media screen and (min-width: 450px) {
    padding: 48px 40px 36px;
  }
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  @media screen and (min-width: 768px) {
    &:before,
    &:after {
      min-height: 30px;
      flex-grow: 1;
      content: '';
      display: block;
      height: 24px;
      box-sizing: border-box;
    }
  }
`;

export const InnerContainer = styled.div`
  padding-top: 50px;
`;

export const EmailInputBox = styled.div`
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0 0 3px #eee;    
    border-radius: 4px;
    color: #202124;
    font-size: 17px;
    height: 56px;
    margin: 1px 1px 0 1px;
    padding: 13px 15px;
  }
  label {
    display: block;
    text-align: left;
  }
`;

export const EmailInputDiv = styled.div`

`

export const CheckBox = styled.div`
  display: block;
  margin-top: 20px;
  input {
    transform: scale(1.5);
  }
`;

export const MoveBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
