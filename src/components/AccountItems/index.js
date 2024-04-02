import classNames from 'classnames/bind';
import styles from './AccountItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/59204d4f640f76cf229ae2f7a8820cbf~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1712224800&x-signature=2%2FPUQ3dA%2B2n4s%2BETi78K1zuYA7w%3D"
        alt=""
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          Nguyen Minh Tri
          <FontAwesomeIcon className={cx('account-checked-icon')} icon={faCheckCircle} />
        </p>
        <span className={cx('username')}>triminh1997</span>
      </div>
    </div>
  );
}

export default AccountItem;
