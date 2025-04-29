import css from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectError, selectLoading } from './redux/contactsSlice';
import { BarLoader } from 'react-spinners';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <div className='app-container'>
      <h1>Phonebook</h1>

      <ContactForm />

      <SearchBox />

      <div className={css.apiMessage}>
        {loading && <BarLoader />}
        {error && <p className={css.fail}>Something went wrong, please try again later.</p>}
      </div>

      <ContactList />
    </div>
  );
}

export default App;
