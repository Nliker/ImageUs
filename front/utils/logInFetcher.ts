import axios, { AxiosError } from 'axios';

/*

  <logInCheckFetcher>

  key 값: '/user/my' => 반환값으로 유저의 정보를 반환한다.
  기능 => 토큰 확인을 하는 기능을 하고 로그인 여부를 반환한다.

*/

const logInCheckFetcher = async (url: string) => {
  try {
    if (!sessionStorage.getItem('TOKEN')) {
      console.log('토큰 없음');
      return { logInState: false };
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    });
    const { user_info } = response.data;

    return { logInState: true, user_info };
  } catch (err) {
    console.log('유효하지 않은 접근입니다.');
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
    sessionStorage.setItem('TOKEN', response.data.access_token);
    sessionStorage.setItem('USER_ID', response.data.user_id);

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
    sessionStorage.setItem('TOKEN', access_token);
    sessionStorage.setItem('USER_ID', user_id);

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err);
    }
    return false;
  }
};

export { logInCheckFetcher, logInRequestFetcher, socialLoginFetcher };
