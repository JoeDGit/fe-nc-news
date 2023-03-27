import React from 'react';
import logo from '../assets/logo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const submitPost = () => {
    const path = '/submit';
    navigate(path);
  };
  return (
    <section
      id="side-bar"
      className="hidden md:flex md:flex-col justify-between h-[50%]  w-[20vw] border-[1px] border-slate-500 rounded mx-auto"
    >
      <div className="flex flex-col items-center my-4 ml-2">
        <img className="w-10 mr-2" src={logo} alt="simple reddit logo" />
        <div>
          <span style={{ color: '#FF4500' }}>S</span>imple{' '}
          <span style={{ color: '#FF4500' }}>R</span>eddit
        </div>
      </div>
      <div className="text-sm mx-4 my-4" id="blurb">
        Welcome to Simple Reddit, a news site that provides a platform for you
        to browse articles, engage with a community of users, and vote on
        content that matters to you. Join in on the conversation and stay
        up-to-date on the latest news. We're excited to have you as part of our
        community and look forward to your contributions!
      </div>
      <Button onClick={submitPost} text={'Add New Post'} />
    </section>
  );
}
