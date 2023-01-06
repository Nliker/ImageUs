import styled from '@emotion/styled';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:first-of-type) {
    padding-top: 24px;
  }

  .input_box {
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;

  height: 56px;
  margin: 1px 1px 0 1px;
  padding: 13px 15px;

  border-radius: 4px;
  font-size: 16px;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px #eee;
  color: #202124;
`;

export const NameBox = styled.div`
  text-align: left;
`;

export const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;

  height: 130px;

  input {
    width: 100%;
  }

  .email_err_message {
    margin-bottom: 10px;

    button {
      width: fit-content;
    }
  }
`;

export const RequestAuthBox = styled.div`
  display: flex;

  // width: 50%;
  gap: 1rem;

  input {
    flex: 5;

    height: 28px;
  }

  button {
    flex: 1;
  }
`;

export const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 1rem;

  .wrap_password_input {
    display: flex;
    flex-direction: column;

    .input_box {
      display: flex;
      gap: 1rem;

      input {
        flex: 1;

        width: 100%;
      }
    }
  }
`;
export const PasswordShowCheckBox = styled.div`
  display: flex;

  font-size: 17px;

  input {
    width: auto;
    height: auto;
  }
`;

export const SubmitBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
`;

export const ErrorText = styled.div`
  text-align: left;

  span {
    margin: 0 0 0 30px;

    color: #d93025;
  }
`;
