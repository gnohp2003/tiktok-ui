import classNames from 'classnames/bind';

import styles from './CommentItem.module.scss';
import { TrashIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const fn = () => {};

function CommentPopup({ onClick = fn }) {
  return (
    <div className={cx('popup-container')}>
      <div className={cx('popup-content')} onClick={onClick}>
        <div className={cx('trash-icon')}>
          <TrashIcon width="2.4rem" height="2.4rem" />
        </div>
        <span className={cx('popup-title')}>Delete</span>
      </div>
    </div>
  );
}

export default CommentPopup;
