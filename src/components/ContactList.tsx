
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ContactItem from './ContactItem';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="container mx-auto py-8">
      {contacts.length === 0 ? (
        <div className="text-center text-gray-700 text-xl">
          No Contact Found. Please add a contact from the Create Contact button.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200"
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
