import classNames from 'classnames/bind';
import styles from './LoadingAnimation.module.scss';

const cx = classNames.bind(styles);

function LoadingAnimation({ className }) {
  return <div className={cx('loader', className)}></div>;
}

export default LoadingAnimation;
