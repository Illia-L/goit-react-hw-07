import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const slice = createSlice({
  name: 'contacts',

  initialState: { items: [], loading: false, error: null },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loading: false,
      }))
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }))
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        loading: false,
      }));
  },
});

export default slice.reducer;

const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, search) =>
    contacts?.filter(contact =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    )
);

const handlePending = state => ({ ...state, loading: true, error: null });

const handleRejected = (state, action) => ({
  ...state,
  error: action.payload,
  loading: false,
});
