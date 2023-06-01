import axios from 'axios';

const searchFetcher = async (url: string) => {
  return axios
    .get('/backapi' + url)
    .then((res) => {
      const { result } = res.data;
      const searchData = result.slice(0, 5);

      return [...searchData];
    })
    .catch(() => {
      throw new Error('검색에 실패했습니다..');
    });
};

export default searchFetcher;
