import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './Video.module.scss';
import { memo, useEffect, useRef, useState } from 'react';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import { useDebounce } from '~/hooks';
import {
  AutoScrollOffIcon,
  AutoScrollOnIcon,
  MuteVolumeIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
} from '../Icons';

const cx = classNames.bind(styles);

function VideoDisplay({ data, from, passData }) {
  const [volume, setVolume] = useState(0);
  const navigate = useNavigate();

  // options for useElementOnscreen hook
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };

  // action control video
  const playBtnRef = useRef();
  const scrollOffBtnRef = useRef();
  const volumeBtnRef = useRef();
  // video ref
  const videoRef = useRef(null);
  // progress
  const progressRef = useRef();

  const isVisibile = useElementOnScreen(options, videoRef);
  const debounceVideoVisible = useDebounce(isVisibile, 2000);

  const handleClickPlay = (e) => {
    e.stopPropagation();
    if (playBtnRef.current.hasAttribute('visible')) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
      playBtnRef.current.removeAttribute('visible');
    } else {
      playBtnRef.current.setAttribute('visible', '');
      videoRef.current.pause();
    }
  };

  const handleClickScroll = (e) => {
    e.stopPropagation();
    const videoList = document.querySelectorAll('video');
    const scrollBtnOff = document.querySelectorAll('#scroll-off');
    if (scrollOffBtnRef.current.hasAttribute('visible')) {
      scrollOffBtnRef.current.removeAttribute('visible');
      // set auto scroll for all video
      videoList.forEach((video, index) => {
        video.removeAttribute('loop');
        scrollBtnOff[index].removeAttribute('visible');
      });
    } else {
      scrollOffBtnRef.current.setAttribute('visible', '');
      // disabled auto scroll from all video
      videoList.forEach((video, index) => {
        video.setAttribute('loop', '');
        scrollBtnOff[index].setAttribute('visible', '');
      });
    }
  };

  const handleClickVolume = (e) => {
    e.stopPropagation();
    if (e.target.id === 'mute') {
      setVolume(50);
    } else {
      setVolume(0);
      progressRef.current.style.width = '0%';
    }
  };

  const handleVolumeSlider = (e) => {
    e.stopPropagation();
    setVolume(Number(e.target.value));
  };

  useEffect(() => {
    if (volume !== 0) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume / 100;
      progressRef.current.style.width = volume + '%';
    } else {
      videoRef.current.muted = true;
    }
  }, [volume]);

  const handleVideoEnd = (e) => {
    e.stopPropagation();
    window.scrollBy(0, 500);
  };

  useEffect(() => {
    if (debounceVideoVisible) {
      if (videoRef.current) {
      }
      playBtnRef.current.removeAttribute('visible');
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      // if (videoRef.current) {
      // }
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [debounceVideoVisible]);

  // click on video
  const handleClickVideo = (e) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      const prevItem = JSON.parse(localStorage.getItem('site')) || {};
      localStorage.setItem('site', JSON.stringify({ ...prevItem, from }));
      passData();
      return navigate(`/${data.user.nickname}/video/${data.uuid}`);
    }
  };

  return (
    <div className={cx('video-container')}>
      <div
        className={cx('video-controls')}
        onClick={(e) => handleClickVideo(e)}
      >
        <div
          ref={playBtnRef}
          id="play"
          className={cx('play-btn')}
          onClick={(e) => handleClickPlay(e)}
        >
          <PlayIcon width="2rem" height="2rem" />
        </div>
        <div className={cx('pause-btn')} onClick={(e) => handleClickPlay(e)}>
          <PauseIcon width="2rem" height="2rem" />
        </div>
        <div
          ref={scrollOffBtnRef}
          id="scroll-off"
          className={cx('scroll-off-btn')}
          onClick={(e) => handleClickScroll(e)}
        >
          <AutoScrollOffIcon width="2.1rem" height="2.1rem" />
        </div>
        <div
          className={cx('scroll-on-btn')}
          onClick={(e) => handleClickScroll(e)}
        >
          <AutoScrollOnIcon width="2.1rem" height="2.1rem" />
        </div>

        <div className={cx('slider-wrapper')}>
          <div className={cx('slider-container')}>
            <div ref={progressRef} className={cx('progress-line')}></div>
            <input
              className={cx('input-range')}
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeSlider(e)}
            />
          </div>
        </div>
        {volume === 0 ? (
          <div
            id="mute"
            className={cx('mute-btn')}
            onClick={(e) => handleClickVolume(e)}
          >
            <MuteVolumeIcon width="2.4rem" height="2.4rem" />
          </div>
        ) : (
          <div
            id="unmute"
            ref={volumeBtnRef}
            className={cx('volume-btn')}
            onClick={(e) => handleClickVolume(e)}
          >
            <VolumeIcon width="2.4rem" height="2.4rem" />
          </div>
        )}
      </div>
      <video
        muted
        playsInline
        preload="none"
        className={cx('video')}
        ref={videoRef}
        poster={data.thumb_url}
        onEnded={(e) => handleVideoEnd(e)}
      >
        <source src={data.file_url} type="video/mp4" />
      </video>
    </div>
  );
}

export default memo(VideoDisplay);
