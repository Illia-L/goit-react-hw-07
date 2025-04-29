import { IoMdPerson } from 'react-icons/io';
import css from './Contact.module.css';
import { MdPhone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

function Contact({ contact }) {
  const dispatch = useDispatch()

  return (
    <li className={css.container}>
      <div className={css.data}>
        <div className={css.dataPiece}>
          <IoMdPerson />
          <span>{contact.name}</span>
        </div>

        <div className={css.dataPiece}>
          <MdPhone />
          <span>{contact.number}</span>
        </div>
      </div>

      <button
        type='button'
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
}

export default Contact;
