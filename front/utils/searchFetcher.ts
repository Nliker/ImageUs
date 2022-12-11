import axios from "axios";

const searchFetcher = async (url: string, email: string) => {
    return axios.get(`${url}?email=${email}`).then((res) => {
        const { result } = res.data;
        return result;
    }).catch((err) => {
        console.log(err);
    });
}

export default searchFetcher;