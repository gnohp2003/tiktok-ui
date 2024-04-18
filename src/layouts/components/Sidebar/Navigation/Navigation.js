import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

function Navigation({ children }) {
  return <nav className={cx('wrapper')}>{children}</nav>;
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Navigation;
