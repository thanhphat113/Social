import React, { useState } from 'react';
import styles from './Contact.module.scss';
import ChatWindow from './../../Messager/ChatWindow';

function Contact() {
  const contacts = [
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD1", avatar: "https://via.placeholder.com/40", online: true },
    { name: "ToànLD2", avatar: "https://via.placeholder.com/40", online: false },
    { name: "ToànLD3", avatar: "https://via.placeholder.com/40", online: true },
  ];

  // const [selectContact, setSelectedContact ] = useState(null);
  // const handleContactClick = (contact) => {
  //   setSelectedContact(contact);
  // };

  return (
    <div className={styles.contacts}>
      <h4>Người liên hệ</h4>
      <div className={styles.contactsList}>
        {contacts.map((contact, index) => (
          <div className={styles.contactsItem}
                key={index}
                // onClick={() => handleContactClick(contact)}
                >
            <img src={contact.avatar} alt={contact.name} />
            <p>{contact.name}</p>
            {contact.online && <span className={styles.online}></span>}
          </div>
        ))}
      </div>
      {/* {
        selectContact && (
          <ChatWindow
            contact = {selectContact}
            onClose = {() => setSelectedContact(null)}
          ></ChatWindow>
        )
      } */}
    </div>
  );
}

export default Contact;
