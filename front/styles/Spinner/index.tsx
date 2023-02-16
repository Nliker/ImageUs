import React, { CSSProperties } from 'react';
import { SyncLoader } from 'react-spinners';

const Spinner = () => {
  const spinnerCSS: CSSProperties = {
    display: 'block',
    margin: '1rem auto',
    textAlign: 'center',
  };

  return <SyncLoader color="cornflowerblue" cssOverride={spinnerCSS} />;
};

export default Spinner;
