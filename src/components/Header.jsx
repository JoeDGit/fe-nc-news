import React from 'react';
import UserInfo from './UserInfo';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between">
      <Link to="/">
        <div className="flex items-center my-2 ml-2">
          <img className="w-10 mr-2" src={logo} alt="simple reddit logo" />
          <div className="md:text-xl">
            <span className="text-primary">S</span>imple{' '}
            <span className="text-primary">R</span>eddit
          </div>
        </div>
      </Link>
      <UserInfo />
    </header>
  );
}
