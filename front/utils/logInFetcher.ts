import axios, { AxiosError } from 'axios';
import { getToken } from './getToken';

const logInCheckFetcher = async (url: string) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error();
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    const { user_info } = response.data;

    return { logInState: true, user_info };
  } catch (err) {
    if (err instanceof AxiosError) {
      alert(err.response?.data.message);
    }
    return { logInState: false };
  }
};

const logInRequestFetcher = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  try {
    const response = await axios.post(url, {
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
    if (err instanceof AxiosError) {
      alert(err.response?.data.message);
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
      `${url}?coperation=${coperation}&code=${code}`,
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
      console.error(err.message);
    }
    return false;
  }
};

export { logInCheckFetcher, logInRequestFetcher, socialLoginFetcher };
