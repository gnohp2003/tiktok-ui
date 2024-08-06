import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function AccountLists({ title = 'Title' }) {
  // User lists which account has followed
  const [followingUser, setFollowingUser] = useState([]);
  const [noMoreFollowingAccount, setNoMoreFollowingAccount] = useState(true);
  // Next URl
  const [next, setNext] = useState('');

  useEffect(() => {
    (async () => {
      const response = await userServices.following();

      if (response) {
        setFollowingUser(response.data);

        if (response.meta.pagination.links.next) {
          setNext(response.meta.pagination.links.next);
          setNoMoreFollowingAccount(false);
        } else {
          setNoMoreFollowingAccount(true);
        }
      }
    })();
  }, []);

  const handleMoreFollowing = () => {
    // String URL handling
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const handledUrl = next.substring(baseUrl.length - 1, next.length);

    (async () => {
      const response = await userServices.following(handledUrl);
      if (response) {
        if (
          response.meta.pagination.current_page ===
          response.meta.pagination.total_pages
        ) {
          setNoMoreFollowingAccount(true);
        } else {
          setNext(response.meta.pagination.links.next);
          setNoMoreFollowingAccount(false);
        }
        setFollowingUser((prev) => prev.concat(response.data));
      }
    })();
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{title}</h2>
      <div className={'account-lists'}>
        <AccountItem data={followingUser} />
      </div>
      {!noMoreFollowingAccount ? (
        <button
          onClick={handleMoreFollowing}
          className={cx('more-account-btn')}
        >
          See more
        </button>
      ) : (
        <p className={cx('following-notice')}>
          Accounts you follow will appear here
        </p>
      )}
    </div>
  );
}

AccountLists.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AccountLists;
