import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';
import { DUserInfo } from '@typing/db';
import { getErrorMessage } from './getErrorMessage';

const logInCheckFetcher = async (url: string) => {
  try {
    const { token } = await getToken();

    if (!token) {
      return { isAuthenticated: 'unauthorized', userInfo: null };
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });
    const { user_info }: { user_info: DUserInfo } = response.data;

    return { isAuthenticated: 'authorized', userInfo: user_info };
  } catch (err) {
    const error = new Error();
    error.name = 'AuthError';

    if (err instanceof AxiosError) {
      error.message = '로그인 요청을 실패했습니다..다시 로그인 해주세요.';
    } else {
      const message = getErrorMessage(err);
      error.message = message;
    }

    throw error;
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
    return response.data.user_id;
  } catch (err) {
    const error = new Error();
    error.name = 'AuthError';

    if (
      err instanceof AxiosError &&
      (err.response?.status === 404 || err.response?.status === 401)
    ) {
      error.message = err.response.data.message;
    } else {
      error.message = '로그인 요청에 실패하였습니다..';
    }

    throw error;
  }
};

const socialLoginFetcher = async ([url, coperation, code]: [
  string,
  string,
  string,
]) => {
  try {
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
    const error = new Error('로그인 요청에 실패했습니다..');
    error.name = 'AuthError';
    throw error;
  }
};

export { logInCheckFetcher, logInRequestFetcher, socialLoginFetcher };
