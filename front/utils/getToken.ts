import axios, { AxiosError } from 'axios';

export const getToken = async () => {
  try {
    const currentTimeDate = new Date();

    const accessTokenExpireTime = sessionStorage.getItem(
      'access_token_expire_time',
    );
    const refreshTokenExpireTime = sessionStorage.getItem(
      'refresh_token_expire_time',
    );

    if (!accessTokenExpireTime || !refreshTokenExpireTime) return null;

    const accessTokenExpireTimeDate = new Date(accessTokenExpireTime);
    const accessTokenDiffTime =
      accessTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    const refreshTokenExpireTimeDate = new Date(refreshTokenExpireTime);
    const refreshTokenDiffTime =
      refreshTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    if (accessTokenDiffTime >= 30000) {
      return sessionStorage.getItem('access_token');
    } else if (refreshTokenDiffTime >= 30000) {
      const userId = sessionStorage.getItem('user_id');
      const response = await axios.post(`/user/${userId}/refresh`, {
        refresh_token: sessionStorage.getItem('refresh_token'),
      });
      const { access_token, access_token_expire_time, user_id } = response.data;
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem(
        'access_token_expire_time',
        access_token_expire_time,
      );
      sessionStorage.setItem('user_id', user_id);

      return access_token;
    } else {
      return null;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      alert('로그인 정보를 받아오지 못했습니다..');
    }
    console.error(err);
    return null;
  }
};
