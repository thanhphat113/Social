import { useState } from 'react';
import clsx from 'clsx';
import styles from './Information.module.scss';
import Button from '../../components/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import * as Yup from 'yup';
import { updateUser } from '../../apis';

// import { Password } from '@mui/icons-material';

function Information() {
  const [selectedContent, setSelectedContent] = useState('User information');
  const currentUserInfo = useSelector((state) => state.user.information);
  const currentUserFriends = useSelector((state) => state.user.friends);
  const currentPostNoti = useSelector((state) => state.user.postrequests);
  const currentReqNoti = useSelector((state) => state.user.requests);
  const [editedUserInfo, setEditedUserInfo] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [showChangePasswordPopup, setChangePasswordPopup] = useState(false);

  useEffect(() => {
    if (currentUserInfo) {
      setEditedUserInfo({
        firstName: currentUserInfo.firstName || '',
        lastName: currentUserInfo.lastName || '',
        email: currentUserInfo.email || '',
        bio: currentUserInfo.bio || '',
        password: '', 
      });
    }
  }, [currentUserInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleSaveChanges = () => {
    if (editedUserInfo) {
      updateUser(currentUserInfo.id, editedUserInfo) // Giả sử `currentUser` có `id`
        .then((response) => {
          if (response.status === 200) {
            alert('User information updated successfully!');
            setIsChanged(false);
          } else {
            alert('Failed to update user information.');
          }
        })
        .catch((error) => {
          console.error('Error updating user information:', error);
          alert('An error occurred while updating user information.');
        });
    }
  };

  useEffect(() => {
    console.log("Current User Post Noti: ", currentPostNoti);
    console.log("Current User Req Noti: ", currentReqNoti);
  }, [currentPostNoti], [currentReqNoti]);


  const handleChangePasswordClick = () => {
    setChangePasswordPopup(true);
  };

  const handleClosePopup = () => {
    setChangePasswordPopup(false);
  };

  const handleChangePass = () => {
    alert("Password changed successfully!");
    handleClosePopup();
  };

  
  const handleSelectContent = (content) => {
    setSelectedContent(content);
  };

  if (!currentUserInfo) {
    return <p>Loading user information...</p>;
  }



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
                  name="firstName"
                  placeholder="First name"
                  value={editedUserInfo?.firstName || ''}
                  onChange={handleInputChange}
                  className={clsx(styles.input)}
                />
              </div>
              <div className={clsx(styles.lastName)}>
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={editedUserInfo?.lastName || ''}
                  onChange={handleInputChange}
                  className={clsx(styles.input)}
                />
              </div>
            </div>
            <div className={clsx(styles.email)}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={editedUserInfo?.email || ''}
                onChange={handleInputChange}
                className={clsx(styles.input)}
              />
            </div>
            <div className={clsx(styles.bio)}>
              <label htmlFor="bio">Description:</label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Description"
                value={editedUserInfo?.bio || ''}
                onChange={handleInputChange}
                className={clsx(styles.textarea)}
              ></textarea>
            </div>
            
            <div className={clsx(styles.buttonContainer)}>
              <Button size="large" className={clsx(styles.registerButton)} onClick={handleChangePasswordClick}>
                Change password
              </Button>
              {isChanged && (
                <Button size="large" className={clsx(styles.saveButton)} onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              )}
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
                      <div className={clsx(styles.formActions)}>
                        <Button type="submit" className={clsx(styles.changePasswordButton)} onClick={handleChangePass}>Change</Button>
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
              {[...currentPostNoti, ...currentReqNoti].map((notification, index) => (
                <li
                  key={notification.id || index}
                  className={clsx(styles.notificationItem, {
                    [styles.unread]: !notification.isRead, 
                  })}
                  onClick={() => handleNotificationClick(notification.id || index)}
                >
                  {notification.type ?  notification.type.content : "Bạn nhận được lời mời kết bạn từ " + notification.lastName}
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
              {currentUserFriends && currentUserFriends.length > 0 ? (
                currentUserFriends.map((friend) => (
                  <div key={friend.UserId} className={clsx(styles.friendCard)}>
                    <img
                      src={friend.profilePicture || 'https://via.placeholder.com/150'} // Đường dẫn mặc định nếu không có hình ảnh
                      alt={`${friend.firstName} ${friend.lastName}`}
                      className={clsx(styles.avatar)}
                    />
                    <p>{`${friend.firstName} ${friend.lastName}`}</p>
                  </div>
                ))
              ) : (
                <div>
                <p>No friends found.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Information;
