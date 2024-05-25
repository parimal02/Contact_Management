 import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../store/contactSlice';
import { v4 as uuidv4 } from 'uuid';

interface ContactFormProps {
  currentContact?: {
    id: string;
    firstName: string;
    lastName: string;
    status: 'active' | 'inactive';
  };
  onUpdate?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ currentContact, onUpdate }) => {
  const [firstName, setFirstName] = useState(currentContact?.firstName || '');
  const [lastName, setLastName] = useState(currentContact?.lastName || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(currentContact?.status || 'active');

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentContact) {
      setFirstName(currentContact.firstName);
      setLastName(currentContact.lastName);
      setStatus(currentContact.status);
    }
  }, [currentContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = { id: currentContact?.id || uuidv4(), firstName, lastName, status };

    if (currentContact) {
      dispatch(updateContact(newContact));
      if (onUpdate) onUpdate();
    } else {
      dispatch(addContact(newContact));
    }

    setFirstName('');
    setLastName('');
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700">Status</span>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
        {currentContact ? 'Update Contact' : 'Save Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
