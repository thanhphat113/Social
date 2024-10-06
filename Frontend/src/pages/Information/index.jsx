import { useState } from 'react';
import clsx from 'clsx';
import styles from './Information.module.scss';

function Information() {
  // Mặc định là "User information"
  const [selectedContent, setSelectedContent] = useState('User information');

  const handleSelectContent = (content) => {
    setSelectedContent(content);
  };

  // Mock data cho phần thông báo và bạn bè
  const [notifications, setNotifications] = useState([
    { id: 1, name: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veritatis, possimus odio iure corrupti, praesentium impedit quod, obcaecati enim dicta cupiditate. Qui perspiciatis cupiditate praesentium neque quaerat expedita, dolore dicta!', isRead: false },
    { id: 2, name: 'Your post was liked', isRead: true },
    { id: 3, name: 'You have a friend request', isRead: false },
  ]);

  const friends = [
    { id: 1, firstName: 'John', lastName: 'Doe', profilePicture: 'https://i.pinimg.com/736x/8c/fe/13/8cfe1317b9b77cc9c1123bbd217f003a.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', profilePicture: 'https://i.pinimg.com/564x/dd/aa/8f/ddaa8fe15abec8d2fd7127c57b635ab1.jpg' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', profilePicture: 'https://i.pinimg.com/564x/ef/8e/a0/ef8ea030b83f0bed7badd969ce99fc91.jpg' },
    { id: 4, firstName: 'John', lastName: 'Doe', profilePicture: 'https://i.pinimg.com/736x/8c/fe/13/8cfe1317b9b77cc9c1123bbd217f003a.jpg' },
    { id: 5, firstName: 'Jane', lastName: 'Smith', profilePicture: 'https://i.pinimg.com/564x/dd/aa/8f/ddaa8fe15abec8d2fd7127c57b635ab1.jpg' },
    { id: 6, firstName: 'Mike', lastName: 'Johnson', profilePicture: 'https://i.pinimg.com/564x/ef/8e/a0/ef8ea030b83f0bed7badd969ce99fc91.jpg' },
  ];

  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true } // Nếu thông báo có ID trùng thì set isRead = true
          : notification
      )
    );
  };


  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.leftContent)}>
        <h1>Information</h1>
        <ul className={clsx(styles.infoList)}>
          <li
            className={clsx({ [styles.selected]: selectedContent === 'User information' })}
            onClick={() => handleSelectContent('User information')}
          >
            User information
          </li>
          <li
            className={clsx({ [styles.selected]: selectedContent === 'Notification' })}
            onClick={() => handleSelectContent('Notification')}
          >
            Notification
          </li>
          <li
            className={clsx({ [styles.selected]: selectedContent === 'Friends' })}
            onClick={() => handleSelectContent('Friends')}
          >
            Friends
          </li>
        </ul>
      </div>

      <div className={clsx(styles.rightContent)}>
        {selectedContent === 'User information' && (
          <div className={clsx(styles.basicInfo)}>
            <h1>User information</h1>
            <div className={clsx(styles.username)}>
              <div className={clsx(styles.firstName)}>
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  className={clsx(styles.input)}
                />
              </div>
              <div className={clsx(styles.lastName)}>
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className={clsx(styles.input)}
                />
              </div>
            </div>
            <div className={clsx(styles.email)}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={clsx(styles.input)}
              />
            </div>
            <div className={clsx(styles.bio)}>
              <label htmlFor="bio">Description:</label>
              <textarea
                id="bio"
                placeholder="Description"
                className={clsx(styles.textarea)}
              ></textarea>
            </div>


            <div className={clsx(styles.changePassword)}>
              <h2>Change password</h2>
              <label htmlFor="newPassword">New password:</label>
              <input
                type="password"
                id="newPassword"
                placeholder="New password"
                className={clsx(styles.input)}
              />
              <label htmlFor="confirmPassword">Verify password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Verify password"
                className={clsx(styles.input)}
              />
              <button type="button" className={clsx(styles.changePasswordButton)}>
                Change
              </button>
            </div>
          </div>


        )}

        {selectedContent === 'Notification' && (
          <div className={clsx(styles.notificationContent)}>
            <h1>Notification</h1>
            <ul className={clsx(styles.notificationList)}>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={clsx(styles.notificationItem)} 
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  {notification.name}
                  {!notification.isRead && <span className={clsx(styles.unreadDot)}></span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedContent === 'Friends' && (
          <div className={clsx(styles.friendContent)}>
            <h1>Friends</h1>
            <div className={clsx(styles.friendsGrid)}>
              {friends.map((friend) => (
                <div key={friend.id} className={clsx(styles.friendCard)}>
                  <img
                    src={friend.profilePicture}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className={clsx(styles.avatar)}
                  />
                  <p>{`${friend.firstName} ${friend.lastName}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Information;
