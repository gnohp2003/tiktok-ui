import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from 'classnames/bind';

import styles from './LoadingSkeleton.module.scss';

const cx = classNames.bind(styles);

function VideoLoadingSkeleton() {
  return (
    <div className={cx('container')}>
      <div className={cx('avatar')}>
        <Skeleton circle height="100%" containerClassName="avatar-skeleton" />
      </div>
      <div className={cx('content')}>
        <Skeleton width={300} />
        <Skeleton width={200} />
        <Skeleton count={3} width={400} />
      </div>
    </div>
  );
}

export default VideoLoadingSkeleton;
