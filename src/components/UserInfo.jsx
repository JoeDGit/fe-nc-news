import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { BsEnvelope } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import user from '../assets/default-user.jpg';

export default function UserInfo() {
  return (
    <div className="flex items-center mr-2">
      <div className="hidden md:flex gap-3 mr-3">
        <AiOutlineBell size={28} />
        <FiSettings size={28} />
        <BsEnvelope size={28} />
      </div>
      <div>
        <img className="w-14 rounded-full" src={user} alt="user avatar" />
      </div>
    </div>
  );
}
