import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import sharedStyles from 'components/sharedStyles.module.css';

const LS_KEY = 'saved_contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleAddContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={sharedStyles.section}>
      <h1 className={sharedStyles.title}>Phonebook</h1>
      <ContactForm
        onChange={onChangeInput}
        addContact={handleAddContact}
        contacts={contacts}
      ></ContactForm>
      <h2 className={sharedStyles.title}>Contacts</h2>
      <Filter filter={filter} handleInputChange={onChangeInput}></Filter>
      <ContactList
        contacts={contacts}
        filter={filter}
        onDelete={deleteContact}
      ></ContactList>
    </div>
  );
};

export default App;
