import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';
import { DUserInfo } from '@typing/db';
import { getErrorMessage } from './getErrorMessage';

const logInCheckFetcher = async (url: string) => {
  try {
    const { token } = await getToken();
    if (!token) {
      return { isAuthenticated: false, userInfo: null };
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });
    const { user_info }: { user_info: DUserInfo } = response.data;

    return { isAuthenticated: true, userInfo: user_info };
  } catch (err) {
    throw new Error('로그인 요청을 실패했습니다..다시 로그인 해주세요.');
  }
};

const logInRequestFetcher = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  try {
    const response = await axios.post('/backapi' + url, {
      email: arg.email,
      password: arg.password,
    });
    sessionStorage.setItem('access_token', response.data.access_token);
    sessionStorage.setItem(
      'access_token_expire_time',
      response.data.access_token_expire_time,
    );
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    sessionStorage.setItem(
      'refresh_token_expire_time',
      response.data.refresh_token_expire_time,
    );
    sessionStorage.setItem('user_id', response.data.user_id);
  } catch (err) {
    if (
      err instanceof AxiosError &&
      (err.response?.status === 404 || err.response?.status === 401)
    ) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error('로그인 요청에 실패하였습니다..');
    }
  }
};

const socialLoginFetcher = async ([url, coperation, code]: [
  string,
  string,
  string,
]) => {
  try {
    if (!coperation || !code) throw new Error('유효한 요청이 아닙니다..');

    const response = await axios.get(
      '/backapi' + `${url}?coperation=${coperation}&code=${code}`,
    );

    const { access_token, user_id } = response.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem(
      'access_token_expire_time',
      response.data.access_token_expire_time,
    );
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    sessionStorage.setItem(
      'refresh_token_expire_time',
      response.data.refresh_token_expire_time,
    );
    sessionStorage.setItem('user_id', user_id);

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error('로그인 요청에 실패했습니다..');
    } else {
      const message = getErrorMessage(err);
      throw new Error(message);
    }
  }
};

export { logInCheckFetcher, logInRequestFetcher, socialLoginFetcher };
