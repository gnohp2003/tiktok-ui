import classNames from 'classnames/bind';
import styles from './AccountItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function AccountItem({ data, onClick }) {
  return (
    <Link to={`/@${data.nickname}`} onClick={onClick}>
      <div className={cx('wrapper')}>
        <Image className={cx('avatar')} src={data.avatar} alt={data.avatar} />
        <div className={cx('info')}>
          <p className={cx('name')}>
            {data.full_name}
            {data.tick && (
              <FontAwesomeIcon
                className={cx('account-checked-icon')}
                icon={faCheckCircle}
              />
            )}
          </p>
          <span className={cx('username')}>{data.nickname}</span>
        </div>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
