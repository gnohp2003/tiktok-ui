import classNames from 'classnames/bind';

import styles from './Creator.module.scss';
import UploadGroup from './UploadGroup';

const cx = classNames.bind(styles);

function UploadSpace() {
  return (
    <div className={cx('upload-box')}>
      <div className={cx('upload-container')}>
        <UploadGroup button />
      </div>
    </div>
  );
}

export default UploadSpace;
