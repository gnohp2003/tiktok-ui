import classNames from 'classnames/bind';

import styles from './UploadForm.module.scss';
import Image from '~/components/Image';
import { memo, useContext, useEffect } from 'react';
import { UploadFormContext } from './UploadForm';

const cx = classNames.bind(styles);

function Cover({ thumbIsAvailable, alterFile, thumbLists }) {
  const { setUploadData } = useContext(UploadFormContext);

  useEffect(() => {
    if (thumbIsAvailable) {
      setUploadData((prev) => ({
        ...prev,
        thumbnail_time: thumbLists[0].atTime,
      }));

      const coverItemLists = document.querySelectorAll('.cover-item-edit');
      coverItemLists[0].closest('.cover-item-edit').setAttribute('active', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbIsAvailable]);

  const handleSelectThumb = (e, item) => {
    setUploadData((prev) => ({ ...prev, thumbnail_time: item.atTime }));

    const coverItemLists = document.querySelectorAll('.cover-item-edit');

    let coverItem;
    coverItemLists.forEach((item) => {
      coverItem = item.closest('.cover-item-edit');
      if (coverItem.hasAttribute('active')) {
        coverItem.removeAttribute('active');
        return;
      }
    });

    e.target.closest('.cover-item-edit').setAttribute('active', '');
  };

  return (
    <div className={cx('cover', 'edit-section')}>
      <div className={cx('title')}>Cover</div>
      <div className={cx('cover-box')}>
        {thumbIsAvailable && !alterFile ? (
          thumbLists.map((item, index) => (
            <div
              key={index}
              className={cx('cover-item') + ' cover-item-edit'}
              onClick={(e) => handleSelectThumb(e, item)}
            >
              <Image className={cx('cover-img')} src={item.thumb} alt="cover" />
            </div>
          ))
        ) : (
          <Image className={cx('cover-img')} />
        )}
      </div>
    </div>
  );
}

export default memo(Cover);
