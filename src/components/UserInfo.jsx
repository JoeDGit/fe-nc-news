import classNames from 'classnames';
import { AiOutlineBell } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { BsEnvelope } from 'react-icons/bs';
import { useContext, useState } from 'react';
import userPic from '../assets/default-user.jpg';
import { UserContext } from '../contexts/User.context';

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const toggleDropdown = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div className="flex items-center justify-center md:mr-10">
      <div className="hidden md:dropdown ">
        <label
          tabIndex={0}
          className="btn px-1 m-1 btn-ghost"
          onClick={toggleDropdown}
        >
          <AiOutlineBell size={24} />
        </label>
        <ul
          tabIndex={0}
          className={classNames(
            'dropdown-content right-1 menu p-2 shadow bg-base-100 border rounded-box w-52',
            { block: isOpen, hidden: !isOpen }
          )}
        >
          <li>
            <a href="/" className="hover:bg-primary">
              Notification 1
            </a>
          </li>
          <li>
            <a href="/" className="hover:bg-primary">
              Notification 2
            </a>
          </li>
          <li>
            <a href="/" className="hover:bg-primary">
              Notification 3
            </a>
          </li>
        </ul>
      </div>
      <div className=" hidden md:dropdown">
        <label
          tabIndex={0}
          className="btn px-1 m-1  btn-ghost"
          onClick={toggleDropdown}
        >
          <FiSettings size={24} />
        </label>
        <ul
          tabIndex={0}
          className={classNames(
            'dropdown-content right-1 menu p-2 shadow bg-base-100 border rounded-box w-52',
            { block: isOpen, hidden: !isOpen }
          )}
        >
          <li>
            <a href="/" className="hover:bg-primary">
              Setting 1
            </a>
          </li>
          <li>
            <a href="/" className="hover:bg-primary">
              Setting 2
            </a>
          </li>
          <li>
            <a href="/" className="hover:bg-primary">
              Setting 3
            </a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex btn btn-ghost px-1 mr-2 ml-1">
        <BsEnvelope size={24} />
      </div>
      <div
        className="
      mr-2 text-primary"
        id="username"
      >
        {user.username}
      </div>
      <div className="mr-2">
        <img className="w-12 rounded-full" src={userPic} alt="user avatar" />
      </div>
    </div>
  );
}
