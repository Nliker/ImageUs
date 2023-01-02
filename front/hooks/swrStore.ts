import useSWR from 'swr';

// const { data: startNumber } = useSWR('store/imageLoadNumber', {
//   fallbackData: 1,
// });

const imageLoadNumber = () => {
  const { data } = useSWR('store/imageLoadNumber', {
    fallbackData: 0,
  });

  return {
    start: data
  };
};

const userImageLoadNumber = () => {
  const { data } = useSWR('store/userImageLoadNumber', {
    fallbackData: 0,
  });

  return {
    start: data
  };
};

export { imageLoadNumber, userImageLoadNumber };
