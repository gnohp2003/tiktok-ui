import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from 'classnames/bind';

import styles from './LoadingSkeleton.module.scss';

const cx = classNames.bind(styles);

function ProfileLoadingSkeleton() {
  return (
    <div className={cx('container')}>
      <div className={cx('user-profile-avatar')}>
        <Skeleton circle height="100%" containerClassName="avatar-skeleton" />
      </div>
      <div className={cx('user-profile-content')}>
        <Skeleton
          width={150}
          height={20}
          className={cx('user-profile-content-item')}
        />
        <Skeleton width={150} height={20} />
        {/* <Skeleton count={3} width={400} /> */}
      </div>
    </div>
  );
}

export default ProfileLoadingSkeleton;
