// src/App.jsx
import "./App.css";

import {useEffect, useState} from "react";
import Section from "./Section";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import contactsData from "../contacts.json";

const LS = {
    save(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    },
    load(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
};
const App = () => {
    const options = {
        key: "contactsData",
        data: contactsData,
    };
    const [contacts, setContacts] = useState(() => LS.load(options.key) ?? options.data);
    const [filter, setFilter] = useState("");

    const uniqueId = () => {
        const lastId = contacts[contacts.length - 1].id.replace(/\D/g, "");
        return Number(lastId);
    };

    const addContact = newContact => {
        setContacts(prevContact => {
            newContact.id = `id-${uniqueId() + 1}`;
            // console.log(newContact);
            return [...prevContact, newContact];
        });
    };
    const removeContact = contactId => {
        console.log(contactId);
        setContacts(prevContact => {
            return prevContact.filter(contact => contact.id !== contactId);
        });
    };

    useEffect(() => {
        LS.save(options.key, contacts);
    }, [contacts]);

    // const showContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    const showContacts = contacts.filter(contact => {
        const input = `${contact.name ?? ""} ${contact.number ?? ""}`;
        return input.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <>
            <Section name="header-section" container={true}>
                <h1 className="title">Phonebook</h1>
            </Section>
            <Section name="form-section" container={true}>
                <ContactForm onAdd={addContact} />
            </Section>
            <Section name="search-section" container={true}>
                <SearchBox value={filter} onFilter={setFilter} />
            </Section>
            <Section name="contactlist-section" container={true}>
                <ContactList data={showContacts} onDelete={removeContact} />
            </Section>
        </>
    );
};

export default App;
