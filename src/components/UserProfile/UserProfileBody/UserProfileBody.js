import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './UserProfileBody.module.scss';
import UserVideo from './UserVideo';
import { useDebounce } from '~/hooks';
import { ProfileContext } from '~/pages/Profile/Profile';
import * as videoService from '~/services/videoService';
import { VideoProfileLoadingSkeleton } from '~/components/LoadingSkeleton';
import NoVideo from './NoVideo';
import LoadingAnimation from '~/components/LoadingAnimation/LoadingAnimation';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

const { uid } = JSON.parse(localStorage.getItem('site')) || '';

function UserProfileBody() {
  const { userData, loading, setLoading } = useContext(ProfileContext);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosLiked, setVideosLiked] = useState([]);
  const [videosLikedNext, setVideosLikedNext] = useState(null);
  const navigate = useNavigate();
  const { setVideoData } = useStore();

  useEffect(() => {
    if (userData) {
      const userVideosFetch = async () => {
        const response = await videoService.userVideos(userData?.id);
        setVideos(response);
        setLoading(false);
      };
      userVideosFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // api videos user liked
  useEffect(() => {
    if (userData) {
      const userVideosLikedFetch = async () => {
        const response = await videoService.userLikedVideos(userData?.id);
        setVideosLiked(response.data);
        setLoading(false);

        response.meta.pagination.links.next &&
          setVideosLikedNext(response.meta.pagination.links.next);
      };
      userVideosLikedFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // Load more videos
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!videosLikedNext) return;

      // split next string
      const startIndex = videosLikedNext.indexOf('users');
      const endIndex = videosLikedNext.length;
      const nextString = videosLikedNext.substring(startIndex, endIndex);

      // Call API
      const moreVideoLikedFetch = async () => {
        setLoadingAnimation(true);
        const response = await videoService.userLikedVideos(
          userData?.id,
          nextString,
        );

        setVideosLiked((prev) => [...prev, ...response.data]);

        if (!response.meta.pagination.links.next) {
          setVideosLikedNext(null);
        } else {
          setVideosLikedNext(response.meta.pagination.links.next);
        }

        setLoadingAnimation(false);
      };

      moreVideoLikedFetch();
    }
  };

  // Behaviors
  const lineRef = useRef();
  const tab1Ref = useRef();
  const tab2Ref = useRef();
  const tab3Ref = useRef();
  const userVideos = useRef();
  const favoriteVideos = useRef();
  const likedVideos = useRef();
  const [previousActiveTabItem, setPreviousActiveTabItem] = useState();
  const [activeTabItem, setActiveTabItem] = useState();
  const [totalWidth, setTotalWidth] = useState(0);
  const [tabItemWidth, setTabItemWidth] = useState(0);

  // Handle video
  const [hoverVideo, setHoverVideo] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const hoverVideoDebounce = useDebounce(hoverVideo, 1000);

  useEffect(() => {
    setActiveTabItem(tab1Ref.current);
    setTabItemWidth(tab1Ref.current.offsetWidth);
    setTotalWidth(0);
    tab2Ref.current && tab2Ref.current.removeAttribute('active');
    tab3Ref.current.removeAttribute('active');
  }, [userData]);

  useEffect(() => {
    if (activeTabItem === tab1Ref.current) {
      userVideos.current && (userVideos.current.style.display = 'flex');
      favoriteVideos.current && (favoriteVideos.current.style.display = 'none');
      likedVideos.current && (likedVideos.current.style.display = 'none');
    } else if (tab2Ref.current && activeTabItem === tab2Ref.current) {
      userVideos.current.style.display = 'none';
      favoriteVideos.current.style.display = 'flex';
      likedVideos.current.style.display = 'none';
    } else if (activeTabItem === tab3Ref.current) {
      userVideos.current.style.display = 'none';
      favoriteVideos.current && (favoriteVideos.current.style.display = 'none');
      likedVideos.current.style.display = 'flex';
    }
  }, [activeTabItem]);

  useEffect(() => {
    lineRef.current.style.width = tabItemWidth + 'px';
    lineRef.current.style.transform = `translateX(${totalWidth}px)`;
    previousActiveTabItem?.removeAttribute('active');
    activeTabItem?.setAttribute('active', '');
  }, [totalWidth, tabItemWidth, activeTabItem, previousActiveTabItem]);

  const handleHoverTabItem = (e) => {
    switch (e.target) {
      case tab1Ref.current:
        setTotalWidth(0);
        setTabItemWidth(e.target.offsetWidth);
        break;
      case tab2Ref.current:
        setTotalWidth(tab1Ref.current.offsetWidth);
        setTabItemWidth(e.target.offsetWidth);
        break;
      case tab3Ref.current:
        const tab2Width = tab2Ref.current ? tab2Ref.current.offsetWidth : 0;
        setTotalWidth(tab1Ref.current.offsetWidth + tab2Width);
        setTabItemWidth(e.target.offsetWidth);
        break;
      default:
        throw new Error('Sometime went wrong');
    }
  };

  const handleMoveOutTabItem = () => {
    if (activeTabItem === tab1Ref.current) {
      setTabItemWidth(tab1Ref.current.offsetWidth);
      setTotalWidth(0);
    } else if (activeTabItem === tab2Ref.current) {
      setTabItemWidth(tab2Ref.current.offsetWidth);
      setTotalWidth(tab1Ref.current.offsetWidth);
    } else if (activeTabItem === tab3Ref.current) {
      setTabItemWidth(tab3Ref.current.offsetWidth);
      const tab2Width = tab2Ref.current ? tab2Ref.current.offsetWidth : 0;
      setTotalWidth(tab1Ref.current.offsetWidth + tab2Width);
    }
  };

  const handleClickTabItem = (e) => {
    setPreviousActiveTabItem(activeTabItem);
    setActiveTabItem(e.target);
  };

  // handle video
  const handleHoverVideo = (videoRef) => {
    setHoverVideo(videoRef.current);
  };

  useEffect(() => {
    if (hoverVideoDebounce) {
      if (currentVideo && currentVideo !== hoverVideoDebounce) {
        currentVideo.pause();
        currentVideo.load();
      }
      setCurrentVideo(hoverVideoDebounce);
      const playPromise = hoverVideoDebounce.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {}).catch((error) => console.log(error));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverVideoDebounce]);

  const handleClickVideo = (type = '', data) => {
    if (type === 'user-videos') {
      const prevItem = JSON.parse(localStorage.getItem('site')) || {};
      localStorage.setItem('site', JSON.stringify({ ...prevItem, from: type }));
      setVideoData({ data: videos, next: null });
      return navigate(`/${data.user.nickname}/video/${data.uuid}`);
    }

    const prevItem = JSON.parse(localStorage.getItem('site')) || {};
    localStorage.setItem('site', JSON.stringify({ ...prevItem, from: type }));
    setVideoData({ data: videosLiked, next: videosLikedNext });
    return navigate(`/${data.user.nickname}/video/${data.uuid}`);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tabs')}>
        <p
          ref={tab1Ref}
          className={cx('tab-item')}
          onMouseOver={handleHoverTabItem}
          onMouseOut={handleMoveOutTabItem}
          onClick={handleClickTabItem}
        >
          Videos
        </p>
        {uid === userData?.id && (
          <p
            ref={tab2Ref}
            className={cx('tab-item')}
            onMouseOver={handleHoverTabItem}
            onMouseOut={handleMoveOutTabItem}
            onClick={handleClickTabItem}
          >
            Favorites
          </p>
        )}
        <p
          ref={tab3Ref}
          className={cx('tab-item')}
          onMouseOver={handleHoverTabItem}
          onMouseOut={handleMoveOutTabItem}
          onClick={handleClickTabItem}
        >
          Liked
        </p>
        <div ref={lineRef} className={cx('tab-line')}></div>
      </div>
      <div className={cx('videos')}>
        <div ref={userVideos} className={cx('video-user-container') + ' row'}>
          {loading ? (
            <VideoProfileLoadingSkeleton className={cx('video-skeleton')} />
          ) : videos.length === 0 ? (
            <NoVideo
              title={
                uid === userData?.id ? 'Upload your first video' : 'No content'
              }
              subtitle={
                uid === userData?.id
                  ? 'Your videos will appear here'
                  : 'This user has not published any videos.'
              }
              icon="user"
            />
          ) : (
            videos.map((video) => (
              <UserVideo
                key={video.uuid}
                data={video}
                from="user-videos"
                handleHoverVideo={handleHoverVideo}
                handleClickVideo={handleClickVideo}
              />
            ))
          )}
        </div>

        {uid === userData?.id && (
          <div
            ref={favoriteVideos}
            className={cx('video-favorite-container') + ' row'}
          >
            <NoVideo
              title="Favorite posts"
              subtitle="Your favorite posts will appear here."
              icon="bookmark"
            />
          </div>
        )}
        <div ref={likedVideos} className={cx('video-liked-container') + ' row'}>
          {loading ? (
            <VideoProfileLoadingSkeleton className={cx('video-skeleton')} />
          ) : videosLiked.length === 0 ? (
            <NoVideo
              title="No liked videos yet"
              subtitle={
                uid === userData?.id
                  ? 'Videos you liked will appear here'
                  : `This user has not liked any videos.`
              }
              icon="user"
            />
          ) : (
            videosLiked.map((video) => (
              <UserVideo
                key={video.uuid}
                data={video}
                from="liked-videos"
                handleHoverVideo={handleHoverVideo}
                handleClickVideo={handleClickVideo}
              />
            ))
          )}
          {loadingAnimation && (
            <div className={cx('loading-container')}>
              <LoadingAnimation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileBody;
