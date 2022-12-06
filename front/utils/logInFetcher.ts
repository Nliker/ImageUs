import axios from 'axios';

// 유저 아이디를 저장하고 토큰 확인을 하는 기능을 한다.
// 백엔드 수정 시 이름은 Auth로 변경 예정

// const logInFetcher = (url: string) => {
//   if (!sessionStorage.getItem('token')) return false;
//   axios
//     .get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//       },
//     })
//     .then((res) => {
//       sessionStorage.setItem('user_id', res.data.id);
//       return true;
//     })
//     .catch(() => {
//       console.log('유효하지 않은 접근입니다.');
//       return false;
//     });
// };

// 임시 로그인 Fetcher
const logInFetcher = () => {
    const hasToken = sessionStorage.getItem('token');
    if (hasToken) {
        return true;
    }
    return false;
};

export default logInFetcher;
