import classNames from 'classnames/bind';
import styles from './UserProfileBody.module.scss';
import { PlayIconRegular } from '~/components/Icons';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function UserVideo({ data, handleHoverVideo, handleClickVideo, from }) {
  const videoRef = useRef();

  const handleVideoEnded = () => {
    videoRef.current.load();
  };

  return (
    <div
      className={cx('video-item') + ' col el-1-5 l-2'}
      onMouseOver={() => handleHoverVideo(videoRef)}
    >
      <div
        className={cx('video-group')}
        onClick={() => handleClickVideo(from, data)}
      >
        <div className={cx('video-info')}>
          <PlayIconRegular
            className={cx('play-icon')}
            width="1.8rem"
            height="1.8rem"
          />
          <strong className={cx('video-view')}>{data.views_count}</strong>
        </div>
        <video
          ref={videoRef}
          className={cx('video')}
          muted
          poster={data.thumb_url}
          onEnded={handleVideoEnded}
        >
          <source src={data.file_url} />
        </video>
      </div>
      <div className={cx('video-title')}>{data.description}</div>
    </div>
  );
}

export default UserVideo;
