import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';

import styles from './UserProfile.module.scss';
import UserProfileHeading from './UserProfileHeading/UserProfileHeading';
import UserProfileBody from './UserProfileBody/UserProfileBody';
import * as userService from '~/services/userServices';
import { ProfileContext } from '~/pages/Profile/Profile';

const cx = classNames.bind(styles);

function UserProfile() {
  const { nickname, setUserData, setUserLoading, setLoading } =
    useContext(ProfileContext);

  // call api
  useEffect(() => {
    const userFetch = async () => {
      setUserLoading(true);
      const response = await userService.user(nickname);
      setUserData(response);
      setUserLoading(false);
    };
    userFetch();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('heading')}>
          <UserProfileHeading />
        </div>
        <div className={cx('body')}>
          <UserProfileBody />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
