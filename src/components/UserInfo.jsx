import classNames from 'classnames';
import { AiOutlineBell } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { BsEnvelope } from 'react-icons/bs';
import { useState } from 'react';
import user from '../assets/default-user.jpg';

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div className="flex items-center justify-center">
      <div className="dropdown ">
        <label
          tabIndex={0}
          className="btn m-1 btn-ghost"
          onClick={toggleDropdown}
        >
          <AiOutlineBell size={28} />
        </label>
        <ul
          tabIndex={0}
          className={classNames(
            'dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52',
            { block: isOpen, hidden: !isOpen }
          )}
        >
          <li>
            <a href="#" className="hover:bg-primary">
              Notification 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary">
              Notification 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary">
              Notification 3
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn m-1  btn-ghost"
          onClick={toggleDropdown}
        >
          <FiSettings size={28} />
        </label>
        <ul
          tabIndex={0}
          className={classNames(
            'dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52',
            { block: isOpen, hidden: !isOpen }
          )}
        >
          <li>
            <a href="#" className="hover:bg-primary">
              Setting 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary">
              Setting 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-primary">
              Setting 3
            </a>
          </li>
        </ul>
      </div>
      <div className="flex p-4 mr-4">
        <BsEnvelope size={28} />
      </div>

      <div className="mr-2">
        <img className="w-14 rounded-full" src={user} alt="user avatar" />
      </div>
    </div>
  );
}
