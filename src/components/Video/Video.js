import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Video.module.scss';
import Button from '../Button';
import Image from '../Image';
import VideoInfo from './VideoInfo';
import VideoDisplay from './VideoDisplay';
import VideoAction from './VideoAction';
import { useAuth } from '~/context';
import { useStore } from '~/context';
const cx = classNames.bind(styles);

function Video({
  data,
  hideFollowBtn,
  handleFollow,
  handleUnfollow,
  followingUserData,
  handleLikeVideo,
  handleUnlikeVideo,
  likeData,
  passData,
  from,
}) {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const [isFollowed, setIsFollowed] = useState(data.user.is_followed);
  const navigate = useNavigate();

  useEffect(() => {
    followingUserData?.forEach((userData) => {
      if (data?.user.id === userData?.id) {
        setIsFollowed(userData.is_followed);
        return;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingUserData]);

  const handleClickAccount = (nickname) => {
    return navigate(`/profile/@${nickname}`);
  };

  const handleClickFollow = () => {
    if (!isAuth) {
      handleDisplayForm();
      return;
    }

    isFollowed ? handleUnfollow(data.user.id) : handleFollow(data.user.id);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <div
          className={cx('avatar-container')}
          onClick={() => handleClickAccount(data.user.nickname)}
        >
          <Image className={cx('avatar-img')} src={data.user.avatar} alt="" />
        </div>
        <VideoInfo data={data} handleClickAccount={handleClickAccount} />
        {!hideFollowBtn && (
          <Button
            outline
            className={cx('follow-btn', {
              isFollowed: isFollowed,
            })}
            onClick={handleClickFollow}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
      <div className={cx('body')}>
        <VideoDisplay data={data} from={from} passData={passData} />
        <VideoAction
          data={data}
          handleLikeVideo={handleLikeVideo}
          handleUnlikeVideo={handleUnlikeVideo}
          likeData={likeData}
          passData={passData}
          from={from}
        />
      </div>
    </div>
  );
}

export default memo(Video);
