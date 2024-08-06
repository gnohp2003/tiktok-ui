import classNames from 'classnames/bind';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Video.module.scss';
import { BookMarkIconSolid, CommentIcon, HeartIcon, ShareIcon } from '../Icons';
import { useAuth } from '~/context';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

function VideoAction({
  data,
  handleLikeVideo,
  handleUnlikeVideo,
  likeData,
  passData,
  from,
}) {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const [likesCount, setLikesCount] = useState(data?.likes_count);
  const navigate = useNavigate();

  // action like video
  const likeBtnRef = useRef();

  useEffect(() => {
    if (isLiked) {
      likeBtnRef.current.setAttribute('active', '');
    } else {
      likeBtnRef.current.removeAttribute('active');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    likeData?.forEach((likeData) => {
      if (data?.uuid === likeData.uuid) {
        setLikesCount(likeData.likes_count);
        if (likeData.is_liked) {
          likeBtnRef.current.setAttribute('active', '');
          setIsLiked(likeData.is_liked);
        } else {
          likeBtnRef.current.removeAttribute('active');
          setIsLiked(likeData.is_liked);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeData]);

  const handleClickComment = () => {
    const prevItem = JSON.parse(localStorage.getItem('site')) || {};
    localStorage.setItem('site', JSON.stringify({ ...prevItem, from }));
    passData();
    return navigate(`/${data.user.nickname}/video/${data.uuid}`);
  };

  const handleClickLike = () => {
    if (!isAuth) {
      handleDisplayForm();
      return;
    }

    isLiked ? handleUnlikeVideo(data?.uuid) : handleLikeVideo(data?.uuid);
  };

  return (
    <div className={cx('video-action')}>
      <button
        ref={likeBtnRef}
        className={cx('action-btn')}
        onClick={handleClickLike}
      >
        <span className={cx('heart-icon')}>
          <HeartIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
        </span>
        <strong className={cx('like-count')}>{likesCount}</strong>
      </button>
      <button className={cx('action-btn')} onClick={handleClickComment}>
        <span className={cx('comment-icon')}>
          <CommentIcon width="2.4rem" height="2.4rem" />
        </span>
        <strong className={cx('comment-count')}>{data?.comments_count}</strong>
      </button>
      <button className={cx('action-btn')}>
        <span className={cx('bookmark-icon')}>
          <BookMarkIconSolid width="2.4rem" height="2.4rem" />
        </span>
        <strong className={cx('bookmark-count')}>{data?.views_count}</strong>
      </button>
      <button className={cx('action-btn')}>
        <span className={cx('share-icon')}>
          <ShareIcon width="2.4rem" height="2.4rem" />
        </span>
        <strong className={cx('share-count')}>{data?.shares_count}</strong>
      </button>
    </div>
  );
}

export default memo(VideoAction);
