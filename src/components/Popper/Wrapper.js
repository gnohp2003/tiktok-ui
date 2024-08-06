import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Wrapper = forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cx('wrapper', className)}>
      {children}
    </div>
  );
});

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
};

export default Wrapper;
