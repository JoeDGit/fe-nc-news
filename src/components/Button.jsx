import React from 'react';

export default function Button({ text, display }) {
  return (
    <button
      className={`${display} active:translate-y-0.5 active:translate-x-0.5 mx-2 mb-2 py-2 px-2 rounded bg-[#FF4500]`}
    >
      {text}
    </button>
  );
}
