import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';
import { DUserInfo } from '@typing/db';

const logInCheckFetcher = async (url: string) => {
  try {
    const { token } = await getToken();
    if (!token) {
      throw new Error();
    }

    const response = await axios.get('/backapi' + url, {
      headers: {
        Authorization: token,
      },
    });
    const { user_info }: { user_info: DUserInfo } = response.data;

    return { isAuthenticated: true, userInfo: user_info };
  } catch (err) {
    return { isAuthenticated: false, userInfo: null };
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

    return true;
  } catch (err) {
    if (
      err instanceof AxiosError &&
      (err.response?.status === 404 || err.response?.status === 401)
    ) {
      alert(err.response.data.message);
    } else {
      alert('로그인 요청에 실패했습니다..');
    }
    return false;
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

    return { result: 'success' };
  } catch (err) {
    alert('로그인 요청에 실패했습니다..');
    return { result: 'fail' };
  }
};

export { logInCheckFetcher, logInRequestFetcher, socialLoginFetcher };
