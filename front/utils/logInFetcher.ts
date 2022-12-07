import axios from 'axios';

// key 값: '/user/my' => 반환값으로 유저의 정보를 반환한다.
// logInFetcher => 토큰 확인을 하는 기능을 하고 로그인 여부를 반환한다.

const logInFetcher = (url: string) => {
  if (!sessionStorage.getItem('TOKEN')) {
    console.log('토큰 없음');
    return false;
  }
  return axios
    .get(url, {
      headers: {
        Authorization: `${sessionStorage.getItem('TOKEN')}`,
      },
    })
    .then(() => {
      console.log('토큰 정상');
      return true;
    })
    .catch(() => {
      console.log('유효하지 않은 접근입니다.');
      return false;
    });
};
// 임시 로그인 Fetcher
// const logInFetcher = () => {
//     const hasToken = sessionStorage.getItem('token');
//     if (hasToken) {
//         return true;
//     }
//     return false;
// };

export default logInFetcher;
