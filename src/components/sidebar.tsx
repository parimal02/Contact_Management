import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-2xl font-bold">Contact App</h1>
      </div>
      <nav>
        <ul className="mt-8">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/">Contacts</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/charts-and-maps">Charts and Maps</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;