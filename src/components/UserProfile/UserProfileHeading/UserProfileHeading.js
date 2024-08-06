import classNames from 'classnames/bind';

import styles from './UserProfileHeading.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { EditIcon, FollowedIcon, ShareIconRegular } from '~/components/Icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProfileContext } from '~/pages/Profile/Profile';
import { ProfileLoadingSkeleton } from '~/components/LoadingSkeleton';
import UserPopup from '../UserPopup/UserPopup';
import * as userService from '~/services/userServices';
import { useAuth } from '~/context';
import { useStore } from '~/context';

const cx = classNames.bind(styles);
const { uid } = JSON.parse(localStorage.getItem('site')) || '';

function UserProfileHeading() {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const {
    userData,
    setUserData,
    userLoading,
    showUserPopup,
    setShowUserPopup,
  } = useContext(ProfileContext);

  const [isUnfollowed, setIsUnfollowed] = useState(null);

  const followBtnRef = useRef();
  const btnGroup = useRef();

  const handleClickEdit = () => {
    setShowUserPopup(true);
  };

  const handleUnfollow = () => {
    const unFollow = async () => {
      const response = await userService.unfollow(userData?.id);
      if (response) {
        setUserData(response.data);
        setIsUnfollowed(true);
      }
    };

    unFollow();
  };

  const handleFollow = () => {
    if (!isAuth) {
      handleDisplayForm();
      return;
    }

    const follow = async () => {
      const response = await userService.follow(userData?.id);
      if (response) {
        setUserData(response.data);
        setIsUnfollowed(false);
      }
    };

    follow();
  };

  // display follow button or message and unfollow button at first accessing
  useEffect(() => {
    btnGroup.current && (btnGroup.current.style.opacity = '1');
    followBtnRef.current && (followBtnRef.current.style.opacity = '1');
  }, [userData]);

  // display with opacity when clicking on follow or unfollow button
  useEffect(() => {
    followBtnRef.current && (followBtnRef.current.style.opacity = '0');
    btnGroup.current && (btnGroup.current.style.opacity = '0');
    let timer;
    if (isUnfollowed !== null) {
      if (isUnfollowed) {
        timer = setTimeout(() => {
          followBtnRef.current && (followBtnRef.current.style.opacity = '1');
        }, 300);
      } else {
        timer = setTimeout(() => {
          btnGroup.current && (btnGroup.current.style.opacity = '1');
        }, 300);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isUnfollowed]);

  return userLoading ? (
    <ProfileLoadingSkeleton />
  ) : (
    <>
      {showUserPopup && <UserPopup setShowUserPopup />}
      <div className={cx('wrapper')}>
        <div className={cx('info-container')}>
          <div className={cx('avatar')}>
            <Image className={cx('avatar-img')} src={userData?.avatar} />
          </div>
          <div className={cx('info')}>
            <h1 className={cx('nickname')}>{userData?.nickname}</h1>
            <h2 className={cx('full-name')}>
              {(userData?.first_name || '') + ' ' + (userData?.last_name || '')}
            </h2>
            <div className={cx('edit-btn-container')}>
              {uid === userData?.id && (
                <Button
                  className={cx('edit-btn')}
                  leftIcon={<EditIcon width="2rem" height="2rem" />}
                  outline
                  onClick={handleClickEdit}
                >
                  Edit profile
                </Button>
              )}
              {uid !== userData?.id && !userData?.is_followed && (
                <Button
                  ref={followBtnRef}
                  className={cx('follow-btn')}
                  primary
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}

              {uid !== userData?.id && userData?.is_followed && (
                <div className={cx('btn-group')} ref={btnGroup}>
                  <Button outline className={cx('message-btn')}>
                    Messages
                  </Button>
                  <Button
                    outline
                    leftIcon={<FollowedIcon width="2rem" height="2rem" />}
                    className={cx('unfollow-btn')}
                    onClick={handleUnfollow}
                  ></Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={cx('count-info-container')}>
          <div className={cx('count-container')}>
            <strong className={cx('count-number')}>
              {userData?.followings_count}
            </strong>
            <p className={cx('count-title')}>Following</p>
          </div>
          <div className={cx('count-container')}>
            <strong className={cx('count-number')}>
              {userData?.followers_count}
            </strong>
            <p className={cx('count-title')}>Follower</p>
          </div>
          <div className={cx('count-container')}>
            <strong className={cx('count-number')}>
              {userData?.likes_count}
            </strong>
            <p className={cx('count-title')}>Liked</p>
          </div>
        </div>
        <div className={cx('user-bio')}>
          <p className={cx('bio-content')}>{userData?.bio}</p>
        </div>
        <div className={cx('share-btn')}>
          <ShareIconRegular width="2.4rem" height="2.4rem" />
        </div>
      </div>
    </>
  );
}

export default UserProfileHeading;
