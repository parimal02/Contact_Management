import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ContactItem from './ContactItem';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div>
      {contacts.length === 0 ? (
        <div>No Contact Found. Please add a contact from the Create Contact button.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
