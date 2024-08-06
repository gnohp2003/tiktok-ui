import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './Video.module.scss';
import {
  ArrowRightIcon,
  AutoScrollOffIcon,
  AutoScrollOnIcon,
  FloatingPlayerIcon,
  MuteVolumeIcon,
  PlayIcon,
  VolumeIcon,
  XIcon,
} from '~/components/Icons';
import { VolumeProgress } from '~/components/VolumeProgress';
import { useEffect, useRef, useState } from 'react';
import VideoControls from './VideoControls';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

function Video({
  data,
  showPreviousBtn,
  showNextBtn,
  handleClickPrevious,
  handleClickNext,
}) {
  const { videoData } = useStore();
  const [toggleVideo, setToggleVideo] = useState(false);
  const [toggleAutoScroll, setToggleAutoScroll] = useState(true);
  const [defaultVolumeValue, setDefaultVolumeValue] = useState(null);
  const [volumeValue, setVolumeValue] = useState('0');
  const [showVolumeProgress, setShowVolumeProgress] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const videoRef = useRef();

  useEffect(() => {
    setToggleVideo(true);
    videoRef.current.load();
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch((error) => {
          console.log();
        });
    }
  }, [data]);

  // Close button
  const handleClose = () => {
    // remove follow status and like status lists on local storage
    const prevItem = JSON.parse(localStorage.getItem('site'));
    delete prevItem.is_followed_lists;
    delete prevItem.is_liked_lists;
    localStorage.setItem('site', JSON.stringify(prevItem));

    return navigate('/', { replace: true });
  };

  // Play/pause video
  window.onload = () => {
    // videoRef.current.play();
  };

  const handleClickVideo = () => {
    if (toggleVideo) {
      videoRef.current.pause();
      setToggleVideo(false);
    } else {
      videoRef.current.play();
      setToggleVideo(true);
    }
  };

  // Turn on/off auto scroll video
  const handleClickAutoScroll = () => {
    setToggleAutoScroll((prev) => !prev);
  };

  // Turn on/off volume when clicking on volume icon
  const handleClickVolume = () => {
    volumeValue === '0'
      ? setDefaultVolumeValue('50')
      : setDefaultVolumeValue('0');
  };

  // get volume value from VolumeProgress component
  const getVolumeValue = (value) => {
    setVolumeValue(value);
  };

  // handle after acquired volume value
  useEffect(() => {
    if (volumeValue) {
      setDefaultVolumeValue(null);
      if (volumeValue === '0') {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = false;
      }

      videoRef.current.volume = volumeValue / 100;
    }
  }, [volumeValue]);

  // when hover volume
  const handleHoverVolume = () => setShowVolumeProgress(true);
  const handleOutVolume = () => setShowVolumeProgress(false);

  // handle calculating video time...
  const handleLoadedVideo = () => {
    let minute, second;
    const duration = videoRef.current.duration;

    minute = Math.floor(duration / 60);
    second = Math.floor(duration % 60);

    minute === 0 && (minute = '00');
    minute < 10 && minute > 0 && (minute = '0' + minute);
    second === 0 && (second = '00');
    second < 10 && second > 0 && (second = '0' + second);

    setVideoDuration({
      duration: Math.floor(duration),
      durationFormatted: `${minute}:${second}`,
    });
  };

  const handleVideoTimeChange = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const percentage = Math.floor((currentTime / duration) * 100);

    setVideoPercentage(percentage);
  };

  // seeked
  const seeked = (position) => {
    const duration = videoRef.current.duration;
    videoRef.current.currentTime = Math.floor((position / 100) * duration);
  };

  // pause video
  const pause = () => {
    videoRef.current.pause();
  };
  const play = () => {
    setToggleVideo(true);
    const playPromise = videoRef.current.play();
    setToggleVideo(true);
    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch((error) => {
          console.log();
        });
    }
  };

  // handle event when video is end
  const handleVideoEnd = () => {
    if (videoData) {
      if (toggleAutoScroll) {
        handleClickNext(data?.user?.id);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {})
            .catch((error) => {
              console.log();
            });
        }
      }
    }
  };

  return (
    <div className={cx('wrapper')}>
      <img className={cx('background-img')} src={data?.thumb_url} alt="" />
      <div className={cx('video-container')}>
        <video
          ref={videoRef}
          className={cx('video')}
          muted
          onClick={handleClickVideo}
          onLoadedData={handleLoadedVideo}
          onTimeUpdate={handleVideoTimeChange}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnd}
        >
          <source src={data?.file_url} />
        </video>
        <VideoControls
          duration={videoDuration}
          percentage={videoPercentage}
          isPlaying={isPlaying}
          seekPosition={seeked}
          pause={pause}
          play={play}
          data={data}
        />
      </div>
      {/* Close video detail page button */}
      <div className={cx('close-btn', 'btn')} onClick={handleClose}>
        <XIcon width="3rem" height="3rem" />
      </div>
      {/* Go to the next or previous video button */}
      {showPreviousBtn && (
        <div
          className={cx('previous-btn', 'btn')}
          onClick={handleClickPrevious}
        >
          <ArrowRightIcon
            className={cx('arrow-top-icon')}
            width="2.6rem"
            height="2.6rem"
          />
        </div>
      )}
      {showNextBtn && (
        <div
          className={cx('next-btn', 'btn')}
          onClick={() => handleClickNext(data?.user?.id)}
        >
          <ArrowRightIcon
            className={cx('arrow-bottom-icon')}
            width="2.6rem"
            height="2.6rem"
          />
        </div>
      )}
      {/* Floating player button */}
      <div className={cx('floating-player-btn', 'btn')}>
        <FloatingPlayerIcon width="2rem" height="2rem" />
      </div>
      {/* Auto scroll button */}
      <div className={cx('auto-scroll-controls-container')}>
        {toggleAutoScroll ? (
          <div
            className={cx('auto-scroll-btn', 'btn')}
            onClick={handleClickAutoScroll}
          >
            <AutoScrollOnIcon width="2rem" height="2rem" />
          </div>
        ) : (
          <div
            className={cx('auto-scroll-btn', 'btn')}
            onClick={handleClickAutoScroll}
          >
            <AutoScrollOffIcon width="2rem" height="2rem" />
          </div>
        )}
      </div>
      {/* Volume button */}
      <div
        className={cx('volume-controls-container')}
        onMouseOver={handleHoverVolume}
        onMouseOut={handleOutVolume}
      >
        <VolumeProgress
          value={defaultVolumeValue}
          getVolumeValue={getVolumeValue}
          showVolumeProgress={showVolumeProgress}
        />
        {volumeValue !== '0' ? (
          <div className={cx('volume-btn', 'btn')} onClick={handleClickVolume}>
            <VolumeIcon width="2rem" height="2rem" />
          </div>
        ) : (
          <div className={cx('volume-btn', 'btn')} onClick={handleClickVolume}>
            <MuteVolumeIcon width="2rem" height="2rem" />
          </div>
        )}
      </div>
      {!toggleVideo && (
        <PlayIcon
          className={cx('play-icon')}
          width="7.4rem"
          height="7.4rem"
          onClick={handleClickVideo}
        />
      )}
    </div>
  );
}

export default Video;
