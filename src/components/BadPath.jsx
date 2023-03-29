import React from 'react';
import badpath from '../assets/404.png';
export default function BadPath() {
  return (
    <div>
      <h2 className="text-3xl">404 - Path not found</h2>
      <div className="flex justify-center mt-10">
        <img src={badpath} alt="bad path"></img>
      </div>
    </div>
  );
}
