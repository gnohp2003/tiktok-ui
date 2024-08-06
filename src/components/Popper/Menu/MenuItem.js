import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import { useAuth } from '~/context';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
  const { auth } = useAuth();
  const classes = cx('menu-item', {
    separate: item.separate,
  });
  return (
    <Button
      className={classes}
      leftIcon={item.icon}
      to={item.to === '/profile' ? `/profile/@${auth.nickname}` : item.to}
      onClick={onClick}
    >
      {item.title}
    </Button>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
