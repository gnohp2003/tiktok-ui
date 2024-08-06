import classNames from 'classnames/bind';

import styles from './UserProfileBody.module.scss';
import { UserIcon, BookMarkIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function NoVideo({ title = '', subtitle = '', icon }) {
  let IconComp = (
    <UserIcon width="9rem" height="9rem" className={cx('no-video-icon')} />
  );

  if (icon === 'user') {
    IconComp = (
      <UserIcon width="9rem" height="9rem" className={cx('no-video-icon')} />
    );
  } else if (icon === 'bookmark') {
    IconComp = (
      <BookMarkIcon
        width="9rem"
        height="9rem"
        className={cx('no-video-icon')}
      />
    );
  }

  return (
    <div className={cx('no-video-container')}>
      {IconComp}
      <p className={cx('no-video-title')}>{title}</p>
      <p className={cx('no-video-subtitle')}>{subtitle}</p>
    </div>
  );
}

export default NoVideo;
