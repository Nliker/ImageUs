import axios from 'axios';

const searchFetcher = async (url: string) => {
  // const [url, email] = [arg[0], arg[1]];
  return axios
    .get(url)
    .then((res) => {
      const { result } = res.data;

      const searchData = result.slice(0, 5);
      return [...searchData];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default searchFetcher;
