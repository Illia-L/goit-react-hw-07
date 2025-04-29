import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectError, selectFilteredContacts } from '../../redux/contactsSlice';

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts)
  const error = useSelector(selectError)

  if(!filteredContacts.length && !error) return <p className={css.message}>No contacts yet. Add your first contact.</p>

  return (
    <ul className={css.container}>
      {filteredContacts?.map(contact => (
        <Contact
          contact={contact}
          key={contact.id}
        />
      ))}
    </ul>
  );
}

export default ContactList;
