import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from 'classnames/bind';

import styles from './LoadingSkeleton.module.scss';

const cx = classNames.bind(styles);

function VideoProfileLoadingSkeleton({ className }) {
  return (
    <div className={cx('video-profile-container', className) + ' row'}>
      {new Array(24).fill(null).map((item, index) => (
        <div
          key={index}
          className={cx('profile-video-item') + ' col el-1-5 l-2'}
        >
          <Skeleton width={'100%'} height={'100%'} />
        </div>
      ))}
    </div>
  );
}

export default VideoProfileLoadingSkeleton;
