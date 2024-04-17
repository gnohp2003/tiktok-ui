import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
  to,
  primary = false,
  small = false,
  large = false,
  outline = false,
  text = false,
  disabled = false,
  className = false,
  leftIcon,
  rightIcon,
  href,
  children,
  onClick = () => {},
  ...propsExpand
}) {
  let Comp = 'button';

  const props = {
    onClick,
    ...propsExpand,
  };

  if (disabled) {
    Object.keys(props).forEach(
      (key) =>
        key.startsWith('on') && props[key] === 'function' && delete props[key],
    );
  }

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = 'a';
    props.href = href;
  }

  const classes = cx('wrapper', {
    primary,
    [className]: className,
    small,
    large,
    outline,
    text,
    disabled,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  primary: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
