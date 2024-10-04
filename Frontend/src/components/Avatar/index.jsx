import Image from "../Image"
import defaultAvt from "../../assets/images/default-avatar.jfif"
import PropTypes from 'prop-types'
import styles from './Avatar.module.scss';
import clsx from "clsx";

function Avatar({ src, alt, size = 80, borderColor = 'white', shape = 'circle', className }) {
    return ( 
      <div
      className={clsx(styles.avatarContainer, className, {
        [styles.circle]: shape === 'circle',
        [styles.square]: shape === 'square',
      })}
      style={{ width: size, height: size }}
    >
      <Image
        src={src || defaultAvt}
        alt={alt}
        className={styles.avatar}
        style={{
          borderColor: borderColor,
          width: size,
          height: size,
        }}
      />
    </div>
     )
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  borderColor: PropTypes.string,
  shape: PropTypes.oneOf(['circle', 'square']), 
  className: PropTypes.string,
}
export default Avatar;