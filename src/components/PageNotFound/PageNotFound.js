import classNames from 'classnames/bind';
import images from '~/assets/images';

import styles from './PageNotFound.module.scss';

const cx = classNames.bind(styles);

function PageNotFound() {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={images.endGif} alt="" />
      <div className={cx('title')}>
        404 <br />
        Page not found
      </div>
    </div>
  );
}

export default PageNotFound;
