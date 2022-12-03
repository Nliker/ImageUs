import axios from "axios";

// const logInFetcher = (url: string) => {
//     axios.get('/auth', {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem('token')}`
//         }
//     }).then(() => {
//         return true;
//     }).catch(() => {
//         return false;
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