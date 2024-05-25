import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../store/contactSlice';
import ContactForm from './ContactForm';

interface ContactItemProps {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    status: 'active' | 'inactive';
  };
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <ContactForm currentContact={contact} onUpdate={handleUpdate} />
      ) : (
        <div>
          <span>{contact.firstName}</span>
          <span>{contact.lastName}</span>
          <span>{contact.status}</span>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ContactItem;
