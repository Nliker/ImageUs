import React, { CSSProperties } from 'react';
import { SyncLoader, HashLoader } from 'react-spinners';

const PageLoading = () => {
  const spinnerCSS: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return <HashLoader color="rgb(54, 215, 183)" cssOverride={spinnerCSS} />;
};

const Spinner = () => {
  const spinnerCSS: CSSProperties = {
    display: 'block',
    margin: '1rem auto',
    textAlign: 'center',
  };

  return <SyncLoader color="cornflowerblue" cssOverride={spinnerCSS} />;
};

export { Spinner, PageLoading };
