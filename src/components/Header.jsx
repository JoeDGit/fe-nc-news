import React from 'react';
import UserInfo from './UserInfo';

export default function Header() {
  return (
    <header style={headerStyle}>
      <span style={{ color: '#FF4500' }}>S</span>imple{' '}
      <span style={{ color: '#FF4500' }}>R</span>eddit
      <UserInfo />
    </header>
  );
}

const headerStyle = {
  display: 'flex',
};
