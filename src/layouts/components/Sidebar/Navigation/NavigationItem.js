import images from '~/assets/images';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

function NavigationItem({
  to,
  title,
  icon,
  activeIcon,
  avatar = images.defaultImage,
}) {
  const renderNavItem = (isActive) => {
    let element = undefined;
    if (icon && title === 'Following') {
      element = (
        <div className={cx('nav-icon')}>{isActive ? activeIcon : icon}</div>
      );
    } else if (icon) {
      element = isActive ? activeIcon : icon;
    } else if (!icon) {
      element = <img className={cx('nav-avatar')} src={avatar} alt="" />;
    }

    return (
      <>
        {element}
        <span className={cx('nav-title')}>{title}</span>
      </>
    );
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cx('nav-item', { active: isActive })}
    >
      {({ isActive }) => renderNavItem(isActive)}
    </NavLink>
  );
}

export default NavigationItem;
