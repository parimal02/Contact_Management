import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: []
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    }
  }
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;
export const selectContacts = (state: RootState) => state.contacts.contacts;
export default contactSlice.reducer;
