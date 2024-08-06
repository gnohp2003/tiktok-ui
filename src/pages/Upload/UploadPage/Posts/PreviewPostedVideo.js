import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import { XIcon } from '~/components/Icons';
import { memo, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function PreviewPostedVideo({
  videoSource,
  togglePreview,
  handleTogglePreview,
}) {
  const modalRef = useRef();
  const contentRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    let timer;
    if (togglePreview) {
      videoRef.current.load();
      modalRef.current.style.display = 'flex';

      timer = setTimeout(() => {
        modalRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'scale(1)';
      }, 100);
    } else {
      modalRef.current.style.opacity = '0';
      timer = setTimeout(() => {
        modalRef.current.style.display = 'none';
        contentRef.current.style.transform = 'scale(0.8)';
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [togglePreview]);

  return (
    <div ref={modalRef} className={cx('preview-wrapper')}>
      <div ref={contentRef} className={cx('preview-container')}>
        <span
          className={cx('close-preview-btn')}
          onClick={() => handleTogglePreview(false)}
        >
          <XIcon width="1.6rem" height="1.6rem" />
        </span>
        <video ref={videoRef} controls autoPlay muted className={cx('video')}>
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default memo(PreviewPostedVideo);
