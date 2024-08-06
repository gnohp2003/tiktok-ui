import classNames from 'classnames/bind';
import { Virtuoso } from 'react-virtuoso';
import { toast } from 'sonner';
import { memo, useEffect, useState } from 'react';

import styles from './Home.module.scss';
import Video from '~/components/Video';
import * as userService from '~/services/userServices';
import * as videoService from '~/services/videoService';
import * as likeService from '~/services/likeService';
import LoadingAnimation from '~/components/LoadingAnimation/LoadingAnimation';
import images from '~/assets/images';
import { VideoLoadingSkeleton } from '~/components/LoadingSkeleton';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

function Home() {
  const { setVideoData } = useStore();
  const [videos, setVideos] = useState([]);
  const [next, setNext] = useState('');
  const [noMoreVideos, setNoMoreVideos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  // following user data
  const [followingUserData, setFollowingUserData] = useState([]);
  const [likeData, setLikeData] = useState([]);

  useEffect(() => {
    const videoFetch = async () => {
      setLoadingSkeleton(true);
      const response = await videoService.videoList('for-you');
      setVideos(response.data);
      setLoadingSkeleton(false);
      setNext(response.meta.pagination.links.next);
    };

    videoFetch();
  }, []);

  // Call api additionally
  // window.onscroll = () => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     const page = next.substring(next.indexOf('page=') + 5, next.length);
  //     console.log(page);
  //     if (page === totalPage) return;
  //     const videoFetchNext = async () => {
  //       const response = await videoService.videoList('for-you', page);
  //       setVideos((prev) => [...prev, ...response.data]);
  //       setNext(response.meta.pagination.links.next);
  //     };

  //     videoFetchNext();
  //   }
  // };

  const moreVideo = () => {
    const page = next.substring(next.indexOf('page=') + 5, next.length);

    const videoFetchNext = async () => {
      setLoading(true);
      const response = await videoService.videoList('for-you', page);
      setVideos((prev) => [...prev, ...response.data]);
      setLoading(false);
      if (response.meta.pagination.links.next) {
        setNext(response.meta.pagination.links.next);
      } else {
        setNoMoreVideos(true);
        setNext('');
      }
    };

    videoFetchNext();
  };

  // handle follow/ unfollow
  const handleFollowUser = async (uid) => {
    try {
      const response = await userService.follow(uid);
      toast('User has been followed');

      if (followingUserData.length === 0) {
        setFollowingUserData([response.data]);
      } else {
        const tempFollowingUserData = followingUserData;
        for (let i = 0; i < tempFollowingUserData.length - 1; i++) {
          if (tempFollowingUserData[i]['id'] === response.data.id) {
            tempFollowingUserData.splice(i, 1, response.data);
            setFollowingUserData([...tempFollowingUserData]);
            return;
          }
        }
        setFollowingUserData((prev) => [...prev, response.data]);
      }
    } catch (error) {
      toast('Failed in following user');
    }
  };

  const handleUnfollowUser = async (uid) => {
    try {
      const response = await userService.unfollow(uid);
      toast('User has been unfollowed');

      if (followingUserData.length === 0) {
        setFollowingUserData([response.data]);
      } else {
        const tempFollowingUserData = followingUserData;
        for (let i = 0; i < tempFollowingUserData.length - 1; i++) {
          if (tempFollowingUserData[i]['id'] === response.data.id) {
            tempFollowingUserData.splice(i, 1, response.data);
            setFollowingUserData([...tempFollowingUserData]);
            return;
          }
        }
        setFollowingUserData((prev) => [...prev, response.data]);
      }
    } catch (error) {
      toast('Failed in unfollowing user');
    }
  };

  // handle like/ unlike video
  const handleLikeVideo = async (uuid) => {
    try {
      const response = await likeService.likeVideo(uuid);

      if (likeData.length === 0) {
        setLikeData([response.data.data]);
      } else {
        const tempLikeData = likeData;
        for (let i = 0; i < tempLikeData.length; i++) {
          if (tempLikeData[i]['uuid'] === response.data.data.uuid) {
            tempLikeData.splice(i, 1, response.data.data);
            setLikeData([...tempLikeData]);
            return;
          }
        }

        // add a new data
        setLikeData((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      toast('Like video was failed');
      console.log(error);
    }
  };

  const handleUnlikeVideo = async (uuid) => {
    try {
      const response = await likeService.unlikeVideo(uuid);

      if (likeData.length === 0) {
        setLikeData([response.data.data]);
      } else {
        const tempLikeData = likeData;
        for (let i = 0; i < tempLikeData.length; i++) {
          if (tempLikeData[i]['uuid'] === response.data.data.uuid) {
            tempLikeData.splice(i, 1, response.data.data);
            setLikeData([...tempLikeData]);
            return;
          }
        }

        // add a new data
        setLikeData((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      toast('Unlike video was failed');
      console.log(error);
    }
  };

  // when clicking on a video, data will be passed on store provider
  const passData = () => {
    setVideoData({ data: videos, next });
  };

  const InnerItem = memo(({ video }) => {
    return (
      <Video
        data={video}
        handleFollow={handleFollowUser}
        handleUnfollow={handleUnfollowUser}
        followingUserData={followingUserData}
        handleLikeVideo={handleLikeVideo}
        handleUnlikeVideo={handleUnlikeVideo}
        likeData={likeData}
        passData={passData}
        from="home"
      />
    );
  });

  const itemContent = (index, video) => {
    return <InnerItem video={video} />;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('list-video-container')}>
        {loadingSkeleton && <VideoLoadingSkeleton />}
        <Virtuoso
          data={videos}
          useWindowScroll
          itemContent={itemContent}
          endReached={() => {
            !noMoreVideos && moreVideo();
          }}
        />
      </div>
      {loading && (
        <div className={cx('loading-container')}>
          <LoadingAnimation />
        </div>
      )}
      {noMoreVideos && (
        <footer className={cx('footer')}>
          <p className={cx('footer-content')}>No more videos</p>
          <img className={cx('footer-gif')} src={images.endGif} alt="" />
        </footer>
      )}
    </div>
  );
}

export default Home;
