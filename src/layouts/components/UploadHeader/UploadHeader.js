import classNames from 'classnames/bind';

import styles from './UploadHeader.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useStore } from '~/context';

const cx = classNames.bind(styles);

function UploadHeader() {
  const { uploadHeaderRef } = useStore();

  return (
    <header ref={uploadHeaderRef} className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link className={cx('logo')}>
          <Image src={images.logo} alt="" />
          <div className={cx('studio-logo-background')}>
            <div className={cx('studio-logo')}>Studio</div>
          </div>
        </Link>
        <div className={cx('avatar')}>
          <Image
            className={cx('avatar-img')}
            src="https://i.pinimg.com/originals/fd/fb/3e/fdfb3e798cba9def8a981788670ba9cd.gif"
            alt=""
          />
        </div>
      </div>
    </header>
  );
}

export default UploadHeader;
