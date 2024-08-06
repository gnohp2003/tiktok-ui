import classNames from 'classnames/bind';

import styles from './UploadLayout.module.scss';
import { UploadHeader } from '../components/UploadHeader';
import { UploadSidebar } from '../components/UploadSidebar';

const cx = classNames.bind(styles);

function UploadLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <UploadHeader />
      <div className={cx('container') + ' row'}>
        <UploadSidebar />
        <div className={cx('content') + ' col l-10'}>{children}</div>
      </div>
    </div>
  );
}

export default UploadLayout;
