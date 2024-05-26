import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-width duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center h-16 bg-gray-900">
        {isOpen ? (
          <h1 className="text-2xl font-bold">Contact App</h1>
        ) : (
          <div className="text-xl font-bold">CA</div>
        )}
      </div>
      <nav>
        <ul className="mt-8">
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <Link to="/">
              <span className={`inline-block ${isOpen ? 'block' : 'hidden'}`}>Contacts</span>
              <span className={`inline-block ${isOpen ? 'hidden' : 'block'} ml-2`}>📇</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <Link to="/charts-and-maps">
              <span className={`inline-block ${isOpen ? 'block' : 'hidden'}`}>Charts and Maps</span>
              <span className={`inline-block ${isOpen ? 'hidden' : 'block'} ml-2`}>📊</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

