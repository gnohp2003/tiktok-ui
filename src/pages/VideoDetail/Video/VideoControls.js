import classNames from 'classnames/bind';

import styles from './Video.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function VideoControls({
  data,
  duration,
  percentage,
  isPlaying,
  seekPosition,
  pause,
  play,
}) {
  const [progressValue, setProgressValue] = useState(0);
  const [countVideoTime, setCountVideoTime] = useState(0);
  const [countVideoTimeFormatted, setCountVideoTimeFormatted] = useState(null);

  const seekbarRef = useRef();

  //   handle Seek
  const handleSeek = (e) => {
    setProgressValue(e.target.value);
    seekPosition(Number(e.target.value));

    const percentage = Number(e.target.value);
    const videoDuration = duration?.duration;
    const currentTime = Math.floor((percentage / 100) * videoDuration);
    setCountVideoTime(currentTime);
  };

  useEffect(() => {
    setCountVideoTime(0);
  }, [data]);

  useEffect(() => {
    seekbarRef.current.style.width = progressValue + '%';
  }, [progressValue]);

  //   When video's current time updated
  useEffect(() => {
    if (percentage) {
      setProgressValue(percentage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (countVideoTime === duration?.duration) return;

      timer = setInterval(() => {
        setCountVideoTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    let minute, second;

    minute = Math.floor(countVideoTime / 60);
    second = Math.floor(countVideoTime % 60);

    minute === 0 && (minute = '00');
    minute < 10 && minute > 0 && (minute = '0' + minute);
    second === 0 && (second = '00');
    second < 10 && second > 0 && (second = '0' + second);

    setCountVideoTimeFormatted(`${minute}:${second}`);
  }, [countVideoTime]);

  return (
    <div className={cx('video-controls')}>
      <div className={cx('seekbar-container')}>
        <input
          type="range"
          value={progressValue}
          min="0"
          max="100"
          step="1"
          className={cx('seekbar-progress')}
          onChange={(e) => handleSeek(e)}
          onMouseDown={() => pause()}
          onMouseUp={() => play()}
        />
        <div ref={seekbarRef} className={cx('seekbar')}></div>
      </div>
      <div
        className={cx('seekbar-time-container')}
      >{`${countVideoTimeFormatted}/${duration?.durationFormatted}`}</div>
    </div>
  );
}

export default VideoControls;
