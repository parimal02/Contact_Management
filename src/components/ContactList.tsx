import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ContactItem from './ContactItem';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {contacts.length === 0 ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">No Contact Found!</strong>
          <span className="block sm:inline"> Please add a contact from the Create Contact button.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <ContactItem contact={contact} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
