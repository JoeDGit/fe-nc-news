import React from 'react';
import { FadeLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function LoadingSpinner({ text }) {
  return (
    <>
      <FadeLoader
        color={'#FF4500'}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <i className="animate-pulse">{text}</i>
    </>
  );
}
