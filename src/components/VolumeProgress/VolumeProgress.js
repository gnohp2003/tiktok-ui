import classNames from 'classnames/bind';

import styles from './VolumeProgress.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function VolumeProgress({ value, getVolumeValue, showVolumeProgress }) {
  const [volumeValue, setVolumeValue] = useState('0');

  const progressRef = useRef();

  const handleChangeVolume = (e) => {
    setVolumeValue(e.target.value);
  };

  useEffect(() => {
    progressRef.current.style.height = `${(80 / 100) * volumeValue}px`;
    getVolumeValue(volumeValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumeValue]);

  // Toggle volume on/off based on property passed
  useEffect(() => {
    value && setVolumeValue(value);
  }, [value]);

  return (
    <div className={cx('wrapper', { active: showVolumeProgress })}>
      <input
        type="range"
        value={volumeValue}
        min="0"
        max="100"
        className={cx('progress-bar')}
        onChange={(e) => handleChangeVolume(e)}
      />
      <div ref={progressRef} className={cx('progress')}></div>
    </div>
  );
}

export default VolumeProgress;
