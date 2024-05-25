
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteContact } from '../store/contactSlice';
// import ContactForm from './ContactForm';

// interface ContactItemProps {
//   contact: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     status: 'active' | 'inactive';
//   };
// }

// const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);

//   const handleDelete = () => {
//     dispatch(deleteContact(contact.id));
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleUpdate = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <ContactForm currentContact={contact} onUpdate={handleUpdate} />
//       ) : (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">
//             {contact.firstName} {contact.lastName}
//           </h3>
//           <p className="text-gray-600 mt-2">Status: {contact.status}</p>
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
//               onClick={handleEdit}
//             >
//               Edit
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactItem;

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
    <div className="bg-white shadow-md rounded-md p-4">
      {isEditing ? (
        <ContactForm currentContact={contact} onUpdate={handleUpdate} />
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {contact.firstName} {contact.lastName}
          </h3>
          <p className="text-gray-500 mb-4">Status: {contact.status}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactItem;
