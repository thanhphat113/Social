import clsx from 'clsx'
import styles from './Information.module.scss'

function information() {
  return (
    <div className={clsx(styles.container)}>

      <div className={clsx(styles.leftContent)}>
        <h1>Information</h1>
        <ul className={clsx(styles.infoList)}>
          <li>User information</li>
          <li>Notification</li>
          <li>Friends</li>
        </ul>
      </div>

      <div className={clsx(styles.rightContent)}>
        <div className={clsx(styles.basicInfo)}>
          <h1>Edit info</h1>

          <div className={clsx(styles.username)}>
            <div className={clsx(styles.firstName)}>
              <label htmlFor="firstName">First name:</label>
              <input type="text" id="firstName" placeholder="First name" className={clsx(styles.input)} />
            </div>
            <div className={clsx(styles.lastName)}>
              <label htmlFor="lastName">Last name:</label>
              <input type="text" id="lastName" placeholder="Last name" className={clsx(styles.input)} />
            </div>
          </div>

          <div className={clsx(styles.email)}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Email" className={clsx(styles.input)} />
          </div>

          <div className={clsx(styles.bio)}>
            <label htmlFor="bio">Description:</label>
            <textarea id="bio" placeholder="Description" className={clsx(styles.textarea)}></textarea>
          </div>
        </div>

        <div className={clsx(styles.changePassword)}>
          <h2>Change password</h2>
          <label htmlFor="newPassword">New password:</label>
          <input type="password" id="newPassword" placeholder="New password" className={clsx(styles.input)} />
          <label htmlFor="confirmPassword">Verify password:</label>
          <input type="password" id="confirmPassword" placeholder="Verify password" className={clsx(styles.input)} />
          <button type="button" className={clsx(styles.changePasswordButton)}>Change</button>
        </div>
      </div>


    </div>


  );
}

export default information;

