import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './VideoDetail.module.scss';
import Video from './Video/Video';
import VideoContent from './VideoContent/VideoContent';
import { useStore } from '~/context';
import * as videoService from '~/services/videoService';
import { toast } from 'sonner';

const cx = classNames.bind(styles);
// const { from } = JSON.parse(localStorage.getItem('site')) || '';
function VideoDetail() {
  const { videoData, setVideoData } = useStore();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [showPreviousBtn, setShowPreviousBtn] = useState(true);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null); //video index
  const [previousPage] = useState(
    JSON.parse(localStorage.getItem('site')).from || '',
  ); //page before accessing here

  useEffect(() => {
    const videoFetching = async () => {
      const response = await videoService.getAVideo(uuid);
      setCurrentVideo(response);
    };

    videoFetching();

    if (videoData) {
      const { data, next } = videoData;

      // check to show previous button
      for (let i = 0; i < data.length; i++) {
        if (data[i]['uuid'] === uuid) {
          if (i === 0) {
            setShowPreviousBtn(false);
            break;
          }
        }
      }

      // check to show next button
      for (let i = 0; i < data.length; i++) {
        if (data[i]['uuid'] === uuid) {
          if (i === data.length - 1 && !next) {
            setShowNextBtn(false);
            break;
          }
        }
      }

      // get current video index
      for (let i = 0; i < data.length; i++) {
        if (data[i]['uuid'] === uuid) {
          setCurrentIndex(i);
          break;
        }
      }
    } else {
      setShowPreviousBtn(false);
      setShowNextBtn(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoData) {
      const { data } = videoData;

      if (currentVideo?.uuid !== data[currentIndex]?.uuid) {
        setCurrentVideo(data[currentIndex]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData]);

  const handleClickPrevious = () => {
    const { data } = videoData;
    const previousIndex = currentIndex - 1;
    const previousVideo = data[previousIndex];
    setCurrentVideo(previousVideo);

    if (previousIndex === 0) {
      setShowPreviousBtn(false);
    }
    setCurrentIndex(previousIndex);

    // show next button
    !showNextBtn && setShowNextBtn(true);
    return navigate(
      `/${previousVideo.user.nickname}/video/${previousVideo.uuid}`,
      { replace: true },
    );
  };

  const handleClickNext = (uid = '') => {
    if (currentIndex === 0 && !previousPage) {
      toast('Something went wrong 👌🤦‍♂️🤦‍♂️🤦‍♂️');
      return;
    }

    const { data, next } = videoData;
    const nextIndex = currentIndex + 1;
    const nextVideo = data[nextIndex];

    nextIndex <= data.length - 1 && setCurrentVideo(nextVideo);

    if (
      (currentIndex === data.length - 1 || nextIndex === data.length - 1) &&
      !!next
    ) {
      // call api
      const page = next.substring(next.indexOf('page=') + 5, next.length);
      let pageUrl = null;

      if (previousPage === 'liked-videos') {
        // pageUrl for user liked video API
        const startIndex = next.indexOf('users');
        const endIndex = next.length;
        pageUrl = next.substring(startIndex, endIndex);
      }

      const fetchNext = async () => {
        let response;

        if (previousPage === 'home') {
          response = await videoService.videoList('for-you', page);
        } else if (previousPage === 'following') {
          response = await videoService.videoList('following', page);
        } else if (previousPage === 'liked-videos') {
          response = await videoService.userLikedVideos(uid, pageUrl);
        }

        const data = response.data;
        const next = response.meta.pagination.links.next || '';
        setVideoData((prev) => ({ data: [...prev['data'], ...data], next }));
      };

      fetchNext();
      // set state
    } else if (nextIndex === data.length - 1 && !next) {
      setShowNextBtn(false);
    }

    setCurrentIndex(nextIndex);

    // show previous button
    !showPreviousBtn && setShowPreviousBtn(true);
    return navigate(`/${nextVideo?.user?.nickname}/video/${nextVideo?.uuid}`, {
      replace: true,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <Video
        data={currentVideo}
        showPreviousBtn={showPreviousBtn}
        showNextBtn={showNextBtn}
        handleClickPrevious={handleClickPrevious}
        handleClickNext={handleClickNext}
      />
      <VideoContent data={currentVideo} />
    </div>
  );
}

export default VideoDetail;
