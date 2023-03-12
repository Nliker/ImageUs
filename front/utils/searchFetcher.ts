import axios from 'axios';

const searchFetcher = async (url: string) => {
  return axios
    .get('/backapi' + url)
    .then((res) => {
      const { result } = res.data;
      const searchData = result.slice(0, 5);

      return [...searchData];
    })
    .catch((err) => {
      console.error(err);
    });
};

export default searchFetcher;
