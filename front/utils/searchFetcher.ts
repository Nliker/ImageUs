import axios from "axios";

const searchFetcher = async (arg: Array<string>) => {
    const [url, email] = [arg[0], arg[1]];
    return axios.get(`${url}?email=${email}`).then((res) => {
        const { result } = res.data;
        return result;
    }).catch((err) => {
        console.log(err);
    });
}

export default searchFetcher;