import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
  const classes = cx('menu-item', {
    separate: item.separate,
  });
  return (
    <Button className={classes} leftIcon={item.icon} to={item.to} onClick={onClick}>
      {item.title}
    </Button>
  );
}

export default MenuItem;
