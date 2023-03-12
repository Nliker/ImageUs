import axios from 'axios';

export const getToken = async () => {
  try {
    const currentTimeDate = new Date();

    const accessTokenExpireTime = sessionStorage.getItem(
      'access_token_expire_time',
    );
    const refreshTokenExpireTime = sessionStorage.getItem(
      'refresh_token_expire_time',
    );

    if (!accessTokenExpireTime || !refreshTokenExpireTime) {
      throw new Error();
    }

    const accessTokenExpireTimeDate = new Date(accessTokenExpireTime);
    const accessTokenDiffTime =
      accessTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    const refreshTokenExpireTimeDate = new Date(refreshTokenExpireTime);
    const refreshTokenDiffTime =
      refreshTokenExpireTimeDate.getTime() - currentTimeDate.getTime();

    if (accessTokenDiffTime >= 30000) {
      return { token: sessionStorage.getItem('access_token'), message: '' };
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

      return { token: access_token, message: '' };
    } else {
      sessionStorage.clear();
      return {
        token: null,
        message: '장시간 요청이 없어서 로그아웃되었습니다..',
      };
    }
  } catch (err) {
    return { token: null, message: '로그인 갱신에 실패했습니다..' };
  }
};
