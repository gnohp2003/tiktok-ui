import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Image from '../Image';
import styles from './FollowingAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return data.map((item) => (
    <Link key={item.id} to={`/profile/@${item.nickname}`}>
      <div className={cx('item-container')}>
        <Image className={cx('avatar')} src={item.avatar} alt="avatar" />
        <div className={cx('info')}>
          <p className={cx('name')}>
            {item.first_name + ' ' + item.last_name}
            {item.tick && (
              <FontAwesomeIcon
                className={cx('account-checked-icon')}
                icon={faCheckCircle}
              />
            )}
          </p>
          <p className={cx('username')}>{item.nickname}</p>
        </div>
      </div>
    </Link>
  ));
}

export default AccountItem;
