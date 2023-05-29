import axios, { AxiosError } from 'axios';
import { getErrorMessage } from './getErrorMessage';

export const getToken = async () => {
  try {
    const currentTimeDate = new Date();

    const accessToken = sessionStorage.getItem('access_token');
    const accessTokenExpireTime = sessionStorage.getItem(
      'access_token_expire_time',
    );
    const refreshTokenExpireTime = sessionStorage.getItem(
      'refresh_token_expire_time',
    );

    if (!accessTokenExpireTime || !refreshTokenExpireTime || !accessToken) {
      // const error = new Error('로그인 정보가 없습니다.. 다시 로그인해주세요!');
      // error.name = 'AuthError';
      // throw error;
      return { token: null };
    }

    const accessTokenExpireTimeDate = new Date(accessTokenExpireTime);
    const accessTokenDiffTime =
      accessTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    const refreshTokenExpireTimeDate = new Date(refreshTokenExpireTime);
    const refreshTokenDiffTime =
      refreshTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    if (accessTokenDiffTime >= 30000) {
      return { token: accessToken };
    } else if (refreshTokenDiffTime >= 30000) {
      const userId = sessionStorage.getItem('user_id');
      const response = await axios.post(`/backapi/user/${userId}/refresh`, {
        refresh_token: sessionStorage.getItem('refresh_token'),
      });
      const { access_token, access_token_expire_time, user_id } = response.data;
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem(
        'access_token_expire_time',
        access_token_expire_time,
      );
      sessionStorage.setItem('user_id', user_id);

      return { token: access_token };
    } else {
      // sessionStorage.clear();
      // return {
      //   token: null,
      //   message: '장시간 요청이 없어서 로그아웃되었습니다..',
      // };
      const error = new Error('장시간 요청이 없어서 로그아웃되었습니다..');
      error.name = 'AuthError';
      throw error;
    }
  } catch (err) {
    // return { token: null, message: '로그인 갱신에 실패했습니다..' };
    if (err instanceof AxiosError) {
      throw new Error('로그인 요청을 실패했습니다..다시 로그인 해주세요.');
    } else {
      throw err;
    }
  }
};
