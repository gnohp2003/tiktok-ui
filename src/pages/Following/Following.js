import classNames from 'classnames/bind';
import { Virtuoso } from 'react-virtuoso';
import { useEffect, useState, memo } from 'react';
import { toast } from 'sonner';

import styles from './Following.module.scss';
import * as videoService from '~/services/videoService';
import * as likeService from '~/services/likeService';
import Video from '~/components/Video';
import LoadingAnimation from '~/components/LoadingAnimation/LoadingAnimation';
import images from '~/assets/images';
import { VideoLoadingSkeleton } from '~/components/LoadingSkeleton';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

function Following() {
  const { setVideoData } = useStore();
  const [videos, setVideos] = useState([]);
  const [next, setNext] = useState('');
  const [noMoreVideos, setNoMoreVideos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [likeData, setLikeData] = useState([]);

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

  useEffect(() => {
    const videoFetch = async () => {
      try {
        setLoadingSkeleton(true);
        const response = await videoService.videoList('following');
        setVideos(response.data);
        setNext(response.meta.pagination.links.next);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSkeleton(false);
      }
    };

    videoFetch();
  }, []);

  const moreVideo = () => {
    const page = next.substring(next.indexOf('page=') + 5, next.length);

    const videoFetchNext = async () => {
      setLoading(true);
      const response = await videoService.videoList('following', page);
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

  const passData = () => setVideoData({ data: videos, next });

  const InnerItem = memo(({ video }) => {
    return (
      <Video
        data={video}
        hideFollowBtn
        handleLikeVideo={handleLikeVideo}
        handleUnlikeVideo={handleUnlikeVideo}
        likeData={likeData}
        passData={passData}
        from="following"
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

export default Following;
