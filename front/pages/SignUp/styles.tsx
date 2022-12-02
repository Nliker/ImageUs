import styled from "@emotion/styled";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    &>div:not(:first-of-type) {
        padding-top: 24px;
    }
`;

export const InputBox = styled.div`
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
    &:not(.pwcheck-label) {
      padding-bottom: 10px;
      color: #d93025;
    }
  }
`;

export const NameBox = styled.div``;
export const EmailBox = styled.div``;
export const PasswordBox = styled.div``;
export const PasswordCheckBox = styled.div`
    display: flex;
    input {
        width: auto;
        height: auto;
    }
`;

export const SubmitBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export const ErrorText = styled.div`
    span {
      margin: 0 0 0 30px;
    }
`;

