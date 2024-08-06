import classNames from 'classnames/bind';
import { toast } from 'sonner';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import {
  CommentIcon,
  EmbedIcon,
  FacebookIcon,
  HeartIcon,
  SendFriendsIcon,
  ShareIcon,
  TwitterCircleIcon,
  WhatsAppIcon,
} from '~/components/Icons';
import { VideoContentContext } from '../../VideoContent';
import * as likeService from '~/services/likeService';
import { useAuth } from '~/context';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

const MainContent = () => {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const { data } = useContext(VideoContentContext);

  const [isLiked, setIsLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  const linkRef = useRef();

  const handleCopyUrl = () => {
    const copyLink = linkRef.current.innerText;

    // copy to clipboard
    navigator.clipboard
      .writeText(copyLink)
      .then(() => toast('copied'))
      .catch((err) => {
        console.log();
      });
  };

  useEffect(() => {
    const { is_liked_lists: lists } = JSON.parse(localStorage.getItem('site'));
    let containLike = false;
    let likeItem;
    if (lists) {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i]['uuid'] === data?.uuid) {
          containLike = true;
          likeItem = lists[i];
          break;
        }
      }
    } else {
      containLike = false;
    }

    if (containLike) {
      setIsLiked(likeItem.isLiked);
      setLikesCount(likeItem.likesCount);
    } else {
      setIsLiked(data?.is_liked);
      setLikesCount(data?.likes_count);
    }
  }, [data]);

  const handleClickLike = () => {
    if (!isAuth) {
      handleDisplayForm();
      return;
    }

    const prevItem = JSON.parse(localStorage.getItem('site'));

    // handling array of liked/unliked lists
    function updateLikeStatus(response, prevItem) {
      let newIsLikedLists;
      if (prevItem.is_liked_lists) {
        newIsLikedLists = prevItem.is_liked_lists;

        for (let i = 0; i < newIsLikedLists.length; i++) {
          if (newIsLikedLists[i]['uuid'] === response.uuid) {
            newIsLikedLists[i]['isLiked'] = response.is_liked;
            newIsLikedLists[i]['likesCount'] = response.likes_count;
            break;
          }

          if (
            newIsLikedLists[i]['uuid'] !== response.uuid &&
            i === newIsLikedLists.length - 1
          ) {
            const newElement = {
              uuid: response.uuid,
              isLiked: response.is_liked,
              likesCount: response.likes_count,
            };
            newIsLikedLists.push(newElement);
            break;
          }
        }
      } else {
        newIsLikedLists = [
          {
            uuid: response.uuid,
            isLiked: response.is_liked,
            likesCount: response.likes_count,
          },
        ];
      }

      return newIsLikedLists;
    }

    if (isLiked) {
      const unlikeRequest = async () => {
        const response = await likeService.unlikeVideo(data?.uuid);

        if (response) {
          const data = response.data.data;
          const newLists = updateLikeStatus(data, prevItem);

          localStorage.setItem(
            'site',
            JSON.stringify({
              ...prevItem,
              is_liked_lists: newLists,
            }),
          );

          setIsLiked(data.is_liked);
          setLikesCount(data.likes_count);
        } else {
          toast('Unlike was failed');
        }
      };
      unlikeRequest();
    } else {
      const likeRequest = async () => {
        const response = await likeService.likeVideo(data?.uuid);

        if (response) {
          const data = response.data.data;
          const newLists = updateLikeStatus(data, prevItem);
          localStorage.setItem(
            'site',
            JSON.stringify({
              ...prevItem,
              is_liked_lists: newLists,
            }),
          );
          setIsLiked(data.is_liked);
          setLikesCount(data.likes_count);
        } else {
          toast('Like was failed');
        }
      };

      likeRequest();
    }
  };

  return (
    <div className={cx('main-content-container')}>
      <div className={cx('action-container')}>
        <div className={cx('interact-actions')}>
          <button className={cx('like-btn')} onClick={handleClickLike}>
            <span
              className={cx('interact-icon', 'heart-icon', { active: isLiked })}
            >
              <HeartIcon width="2rem" height="2rem" />
            </span>
            <strong className={cx('interact-count')}>{likesCount}</strong>
          </button>
          <div className={cx('comment-interact-info')}>
            <span className={cx('interact-icon', 'comment-icon')}>
              <CommentIcon width="2rem" height="2rem" />
            </span>
            <strong className={cx('interact-count')}>
              {data?.comments_count}
            </strong>
          </div>
        </div>
        <div className={cx('share-actions')}>
          <span className={cx('share-icon')}>
            <EmbedIcon width="2.4rem" height="2.4rem" />
          </span>
          <span className={cx('share-icon')}>
            <SendFriendsIcon width="2.4rem" height="2.4rem" />
          </span>
          <span className={cx('share-icon')}>
            <FacebookIcon width="2.4rem" height="2.4rem" />
          </span>
          <span className={cx('share-icon')}>
            <WhatsAppIcon width="2.4rem" height="2.4rem" />
          </span>
          <span className={cx('share-icon')}>
            <TwitterCircleIcon width="2.4rem" height="2.4rem" />
          </span>
          <span className={cx('share-btn')}>
            <ShareIcon width="1.6rem" height="1.6rem" />
          </span>
        </div>
      </div>
      <div className={cx('copy-link-container')}>
        <p ref={linkRef} className={cx('copy-link-text')}>
          {window.location.href}
        </p>
        <button className={cx('copy-btn')} onClick={handleCopyUrl}>
          Copy link
        </button>
      </div>
    </div>
  );
};

export default MainContent;
