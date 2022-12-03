import axios from 'axios';

const getDataFetcher = (url: string) => {
    axios.get(url, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
};

export default getDataFetcher;