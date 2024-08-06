import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

function Navigation({ className, children }) {
  return <nav className={cx('wrapper', className)}>{children}</nav>;
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Navigation;
