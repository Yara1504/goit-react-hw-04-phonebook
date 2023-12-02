import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

 const addContact = ({ name, number }) => {
   const contact = {
     id: nanoid(),
     name,
     number,
   };

      if (contacts.find((prevContact) => prevContact.name === contact.name)) {
        alert(
          `${contact.name} is already in contacts`);
      return;
    }
   setContacts((prevContacts) => [contact, ...prevContacts]);
 };

 const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id));
  };

 const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = contacts.filter(({ name }) =>
  name.toLowerCase().includes(filter.toLowerCase())
);

return (
  <div>
    <h1>Phonebook</h1>
    <ContactForm onSubmit={addContact} />

    <h2>Contacts</h2>
    <Filter filter={filter} changeFilter={changeFilter} />
    <ContactList
      contacts={filterContacts}
      onDelete={deleteContact}
    />
  </div>
);
  }

