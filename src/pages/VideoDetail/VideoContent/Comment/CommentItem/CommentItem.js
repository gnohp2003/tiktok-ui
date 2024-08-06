import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import { HeartIcon, HeartIconRegular, MoreIcon } from '~/components/Icons';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '~/utils/formatDate';
import CommentPopup from './CommentPopup';
import * as likeService from '~/services/likeService';
import { toast } from 'sonner';

const cx = classNames.bind(styles);

const { uid } = JSON.parse(localStorage.getItem('site')) || '';

const CommentItem = ({ data, handleClickPopup }) => {
  const [commentDate, setCommentDate] = useState(null);
  const [visibleItem, setVisibleItem] = useState(true);
  const [isLiked, setIsLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  const itemRef = useRef();

  useEffect(() => {
    if (data) {
      setCommentDate(formatDate(data?.updated_at));
      setIsLiked(data?.is_liked);
      setLikesCount(data?.likes_count);
    }
  }, [data]);

  const removeItem = () => {
    setVisibleItem(false);
  };

  const handleClickLike = () => {
    const likeRequest = async (type) => {
      const response = await likeService[type](data?.id);

      if (response) {
        setIsLiked(response.is_liked);
        setLikesCount(response.likes_count);
      } else {
        toast('Like comment has been failed. Please try again!');
      }
    };

    if (isLiked) {
      likeRequest('unlikeComment');
    } else {
      likeRequest('likeComment');
    }
  };

  return (
    visibleItem && (
      <div ref={itemRef} className={cx('item')}>
        <Link
          className={cx('user-link')}
          to={`/profile/@${data?.user?.nickname}`}
        >
          <Image className={cx('avatar')} src={data?.user?.avatar} alt="" />
        </Link>
        <div className={cx('content-container')}>
          <Link className={cx('nickname')}>{data?.user?.nickname}</Link>
          <p className={cx('content')}>{data?.comment}</p>
          <div className={cx('sub-content')}>
            <p className={cx('date')}>{commentDate}</p>
            <span className={cx('reply-btn')}>Reply</span>
          </div>
        </div>
        <div className={cx('action-container')}>
          <div className={cx('comment-more-btn')}>
            <MoreIcon width="2.4rem" height="2.4rem" />
            {data?.user?.id === uid && (
              <CommentPopup
                onClick={() => handleClickPopup(data?.id, removeItem)}
              />
            )}
          </div>
          <div className={cx('like-wrapper')}>
            <span className={cx('like-btn')} onClick={handleClickLike}>
              {isLiked ? (
                <HeartIcon
                  className={cx('like-icon')}
                  width="2rem"
                  height="2rem"
                />
              ) : (
                <HeartIconRegular width="2rem" height="2rem" />
              )}
            </span>
            <p className={cx('like-count')}>{likesCount}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentItem;
