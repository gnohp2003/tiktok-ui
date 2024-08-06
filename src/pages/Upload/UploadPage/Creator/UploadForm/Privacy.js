import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './UploadForm.module.scss';
import { memo, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { UploadFormContext } from './UploadForm';

const cx = classNames.bind(styles);

function Privacy({ privacyItems, alterFile }) {
  const { setUploadData } = useContext(UploadFormContext);

  const [privacyValue, setPrivacyValue] = useState({
    title: 'Everyone',
    value: 'public',
  });
  const [showPrivacyList, setShowPrivacyList] = useState(false);

  const handlePrivacy = (e, item) => {
    e.stopPropagation();
    setShowPrivacyList((prev) => !prev);
    setPrivacyValue({ title: item?.title, value: item?.value });
    setUploadData((prev) => ({ ...prev, viewable: item?.value }));
  };

  useEffect(() => {
    alterFile &&
      setPrivacyValue({
        title: 'Everyone',
        value: 'public',
      });
  }, [alterFile]);

  return (
    <div className={cx('privacy', 'edit-section')}>
      <div className={cx('title')}>Who can watch this video</div>
      <div className={cx('privacy-container')}>
        <Tippy
          interactive
          visible={showPrivacyList}
          offset={[-4, 0]}
          arrow="false"
          placement="bottom"
          onClickOutside={() => setShowPrivacyList(false)}
          animation="shift-away"
          className={cx('tippy')}
          content={
            <ul className={cx('privacy-list')}>
              {privacyItems.map((item) => (
                <li
                  key={item.id}
                  className={cx('privacy-item')}
                  onClick={(e) => handlePrivacy(e, item)}
                >
                  {item.title}
                  {item.info && (
                    <div className={cx('privacy-info')}>{item.info}</div>
                  )}
                </li>
              ))}
            </ul>
          }
        >
          <div
            className={cx('privacy-input')}
            onClick={() => setShowPrivacyList(true)}
          >
            {privacyValue.title}
            <div style={{ width: '2rem', textAlign: 'center' }}>
              <FontAwesomeIcon icon={faAngleDown} className={cx('down-icon')} />
            </div>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default memo(Privacy);
