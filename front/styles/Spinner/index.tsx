import React, { CSSProperties } from 'react';
import { SyncLoader, FadeLoader } from 'react-spinners';

const PageLoading = () => {
  const spinnerCSS: CSSProperties = {
    top: '50%',
    left: '50%',
  };

  return <FadeLoader color="rgb(54, 215, 183)" cssOverride={spinnerCSS} />;
};

const Spinner = () => {
  const spinnerCSS: CSSProperties = {
    display: 'block',
    margin: '1rem auto',
    textAlign: 'center',
  };

  return <SyncLoader color="rgb(54, 215, 183)" cssOverride={spinnerCSS} />;
};

export { Spinner, PageLoading };
