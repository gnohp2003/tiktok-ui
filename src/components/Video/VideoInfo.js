import classNames from 'classnames/bind';

import styles from './Video.module.scss';
import { memo, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function VideoInfo({ data, handleClickAccount }) {
  const contentDescRef = useRef();
  // action video desc ref
  const moreBtnRef = useRef();
  const lessBtnRef = useRef();

  useEffect(() => {
    if (contentDescRef.current.offsetHeight <= 42) {
      moreBtnRef.current.setAttribute('hide', '');
      contentDescRef.current.setAttribute('show-all', '');
    } else {
      moreBtnRef.current.removeAttribute('hide', '');
      contentDescRef.current.removeAttribute('show-all', '');
    }
  }, []);

  const handleMoreDesc = () => {
    moreBtnRef.current.setAttribute('hide', '');
    lessBtnRef.current.setAttribute('visible', '');
    contentDescRef.current.setAttribute('show-all', '');
  };

  const handleLessDesc = () => {
    moreBtnRef.current.removeAttribute('hide');
    lessBtnRef.current.removeAttribute('visible');
    contentDescRef.current.removeAttribute('show-all');
  };

  return (
    <div className={cx('info')}>
      <div className={cx('user-info')}>
        <h3
          className={cx('nickname')}
          onClick={() => handleClickAccount(data.user.nickname)}
        >
          {data.user.nickname}
        </h3>
        <h4 className={cx('full-name')}>
          {data.user.first_name + ' ' + data.user.last_name}
        </h4>
      </div>
      <div className={cx('video-desc')}>
        <p ref={contentDescRef} className={cx('content-desc')}>
          {data.description}
        </p>
        <button
          onClick={handleMoreDesc}
          ref={moreBtnRef}
          className={cx('more-btn')}
        >
          more
        </button>
        <button
          onClick={handleLessDesc}
          ref={lessBtnRef}
          className={cx('less-btn')}
        >
          less
        </button>
      </div>
    </div>
  );
}

export default memo(VideoInfo);
