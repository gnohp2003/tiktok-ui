import classNames from 'classnames/bind';

import styles from './FeatureUnavailable.module.scss';
import images from '~/assets/images';
import Image from '../Image';
import { memo } from 'react';

const cx = classNames.bind(styles);

function FeatureUnavailable({ title = null }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Image className={cx('img')} src={images.endGif} alt="" />
        <div className={cx('title')}>
          {title ? title : 'This feature is unavailable'} 😵😵😵{' '}
        </div>
      </div>
    </div>
  );
}

export default memo(FeatureUnavailable);
