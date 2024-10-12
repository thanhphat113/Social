import React from 'react';
import styles from './Contact.module.scss';

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

  return (
    <div className={styles.contacts}>
      <h4>Người liên hệ</h4>
      <div className={styles.contactsList}>
        {contacts.map((contact, index) => (
          <div className={styles.contactsItem} key={index}>
            <img src={contact.avatar} alt={contact.name} />
            <p>{contact.name}</p>
            {contact.online && <span className={styles.online}></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
