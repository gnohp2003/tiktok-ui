import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { VideoContentContext } from '../../VideoContent';
import * as userServices from '~/services/userServices';
import { useStore } from '~/context';
import { useAuth } from '~/context';

const cx = classNames.bind(styles);

const DescriptionContent = () => {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const { data } = useContext(VideoContentContext);

  const [isFollowed, setIsFollowed] = useState(null);

  const followBtnRef = useRef();

  useEffect(() => {
    const { is_followed_lists: lists } = JSON.parse(
      localStorage.getItem('site'),
    );
    let containUser = false;
    let userItem;
    if (lists) {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i]['id'] === data?.user?.id) {
          containUser = true;
          userItem = lists[i];
          break;
        }
      }
    } else {
      containUser = false;
    }

    containUser
      ? setIsFollowed(userItem.isFollowed)
      : setIsFollowed(data?.user?.is_followed);
  }, [data]);

  const handleClickFollow = () => {
    if (!isAuth) {
      handleDisplayForm();
      return;
    }

    const prevItem = JSON.parse(localStorage.getItem('site'));

    // handling array of followed/unfollowed lists
    function updateFollowStatus(response, prevItem) {
      let newIsFollowedLists;
      if (prevItem.is_followed_lists) {
        newIsFollowedLists = prevItem.is_followed_lists;

        for (let i = 0; i < newIsFollowedLists.length; i++) {
          if (newIsFollowedLists[i]['id'] === response.data.id) {
            newIsFollowedLists[i]['isFollowed'] = response.data.is_followed;
            break;
          }

          if (
            newIsFollowedLists[i]['id'] !== response.data.id &&
            i === newIsFollowedLists.length - 1
          ) {
            const newElement = {
              id: response.data.id,
              isFollowed: response.data.is_followed,
            };
            newIsFollowedLists.push(newElement);
            break;
          }
        }
      } else {
        newIsFollowedLists = [
          { id: response.data.id, isFollowed: response.data.is_followed },
        ];
      }

      return newIsFollowedLists;
    }

    if (isFollowed) {
      const unfollowRequest = async () => {
        const response = await userServices.unfollow(data?.user?.id);

        if (response) {
          const newLists = updateFollowStatus(response, prevItem);

          localStorage.setItem(
            'site',
            JSON.stringify({
              ...prevItem,
              is_followed_lists: newLists,
            }),
          );

          setIsFollowed(response.data.is_followed);
          toast('User has been unfollowed');
        } else {
          toast('Unfollow was failed');
        }
      };
      unfollowRequest();
    } else {
      const followRequest = async () => {
        const response = await userServices.follow(data?.user?.id);

        if (response) {
          const newLists = updateFollowStatus(response, prevItem);

          localStorage.setItem(
            'site',
            JSON.stringify({
              ...prevItem,
              is_followed_lists: newLists,
            }),
          );
          setIsFollowed(response.data.is_followed);
          toast('User has been followed');
        } else {
          toast('Follow was failed');
        }
      };

      followRequest();
    }
  };

  return (
    <div className={cx('desc-content-container')}>
      <div className={cx('info-container')}>
        <Link
          className={cx('user-link')}
          to={`/profile/@${data?.user?.nickname}`}
        >
          <Image className={cx('avatar')} src={data?.user?.avatar} alt="" />
        </Link>
        <Link
          className={cx('user-link')}
          to={`/profile/@${data?.user?.nickname}`}
        >
          <span className={cx('nickname')}>{data?.user?.nickname}</span>
          <span
            className={cx('name')}
          >{`${data?.user?.first_name} ${data?.user?.last_name}`}</span>
        </Link>
        <Button
          ref={followBtnRef}
          primary
          className={cx('follow-btn', { following: isFollowed })}
          onClick={handleClickFollow}
        >
          {isFollowed ? 'Following' : 'Follow'}
        </Button>
      </div>
      <div className={cx('desc-container')}>
        <p className={cx('desc-content')}>{data?.description}</p>
      </div>
    </div>
  );
};

export default DescriptionContent;
