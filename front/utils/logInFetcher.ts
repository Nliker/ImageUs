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
    return;
  }
  // return axios
  //   .get(url, {
  //     headers: {
  //       Authorization: `${sessionStorage.getItem('TOKEN')}`,
  //     },
  //   })
  //   .then(() => {
  //     console.log('토큰 정상');
  //     // const { user_info } = res.data;
  //     // sessionStorage.setItem('NAME', user_info.name);
  //     // sessionStorage.setItem('EMAIL', user_info.email);
  //     // sessionStorage.setItem('PROFILE', user_info.profile);
  //     return true;
  //   })
  //   .catch(() => {
  //     console.log('유효하지 않은 접근입니다.');
  //     return false;
  //   });
};

/*

  <logInRequestFetcher>

  key 값: '/user/login' => 로그인 페이지에서 아이디, 패스워드를 입력받고 토큰을 받는다.
  기능 => 토큰과 유저아이디를 세션 스토리지에 저장하고 로그인 성공여부를 반환한다.

*/

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
// 임시 로그인 Fetcher
// const logInFetcher = () => {
//     // const hasToken = sessionStorage.getItem('token');
//     // if (hasToken) {
//     //     return true;
//     // }
//     // return false;
//     return true;
// };

export { logInCheckFetcher, logInRequestFetcher };
