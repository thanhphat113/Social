import { useState } from 'react';
import clsx from 'clsx';
import styles from './Information.module.scss';
import Button from '../../components/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Information() {
  // Mặc định là "User information"
  const [selectedContent, setSelectedContent] = useState('User information');

  const handleSelectContent = (content) => {
    setSelectedContent(content);
  };

  const handleChangePasswordClick = () => {
    setChangePasswordPopup(true);
  };

  const handleClosePopup = () => {
    setChangePasswordPopup(false);
  };

  const [showChangePasswordPopup, setChangePasswordPopup] = useState(false);



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
              {/* <h2>Change password</h2>
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
              <button type="button" className={clsx(styles)}>
                Change
              </button> */}

              <Button size='large' className={clsx(styles.registerButton)} onClick={handleChangePasswordClick}>
                Change password
              </Button>

            </div>

            {showChangePasswordPopup && (
              <div className={clsx(styles.registerPopup)} onClick={handleClosePopup}>
                <div className={clsx(styles.popupContent)} onClick={(e) => e.stopPropagation()}>
                  <h2 style={{ margin: '15px', color: '#1D72FE' }}>Change password</h2>
                  <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                      newPassword: Yup.string().min(6, 'Password at least 6 characters').required('Enter new password'),
                      confirmPassword: Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                        .required('Enter new password again'),
                    })}
                    onSubmit={(values) => {
                      console.log('Password change form submitted', values);
                      handleClosePopup();
                    }}
                  >
                    <Form>
                      <div className={clsx(styles.formGroup)}>
                        <Field type="password" id="newPassword" name="newPassword" placeholder="New password" />
                        <ErrorMessage name="newPassword" component="div" className={clsx(styles.errorMessage)} />
                      </div>
                      <div className={clsx(styles.formGroup)}>
                        <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Verify new password" />
                        <ErrorMessage name="confirmPassword" component="div" className={clsx(styles.errorMessage)} />
                      </div>
                      <div className={clsx(styles.formGroup)}>
                        <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Former passowrd" />
                        <ErrorMessage name="confirmPassword" component="div" className={clsx(styles.errorMessage)} />
                      </div>
                      <div className={clsx(styles.formActions)}>
                        <Button type="submit" className={clsx(styles.changePasswordButton)}>Change</Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            )}
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
