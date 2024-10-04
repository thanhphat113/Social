
import clsx from 'clsx';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  type = 'button',
  color = 'primary',
  size = 'medium',
  className,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button--${color}`],
        styles[`button--${size}`],
        className,
        { [styles['button--disabled']]: disabled }
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,              
    type: PropTypes.oneOf(['button', 'submit', 'reset']), 
    color: PropTypes.oneOf(['primary', 'secondary','thirdary' ,'danger']),  
    size: PropTypes.oneOf(['small', 'medium', 'large']), 
    className: PropTypes.string,          
    disabled: PropTypes.bool,             
  };
export default Button;