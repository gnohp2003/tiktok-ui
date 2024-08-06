import classNames from 'classnames/bind';

import styles from './UploadForm.module.scss';
import { memo, useContext, useEffect, useState } from 'react';
import { UploadFormContext } from './UploadForm';

const cx = classNames.bind(styles);

function Allow({ allowingItems, alterFile }) {
  const { uploadData, setUploadData } = useContext(UploadFormContext);

  const [allows, setAllows] = useState(allowingItems);

  const handleCheck = (id) => {
    const newAllows = allows.map((allow) => {
      return allow.id === id ? { ...allow, checked: !allow.checked } : allow;
    });

    setAllows(newAllows);
  };

  useEffect(() => {
    allows.forEach((allow) => {
      if (allow.checked && !uploadData.allow.includes(allow.value)) {
        setUploadData(() => ({
          ...uploadData,
          allow: [...uploadData.allow, allow.value],
        }));
      } else if (!allow.checked && uploadData.allow.includes(allow.value)) {
        const newArray = uploadData.allow;
        newArray.splice(uploadData.allow.indexOf(allow.value), 1);

        setUploadData(() => ({
          ...uploadData,
          allow: newArray,
        }));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allows]);

  useEffect(() => {
    setAllows(allowingItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alterFile]);

  return (
    <div className={cx('allowing', 'edit-section')}>
      <div className={cx('title')}>Allow</div>
      <div className={cx('allowing-list')}>
        {allows.map((item) => (
          <div key={item.id} className={cx('allowing-item')}>
            <input
              type="checkbox"
              id={item.value}
              name={item.value}
              value={item.value}
              className={cx('allowing-input')}
              checked={item.checked}
              onChange={() => handleCheck(item.id)}
            />
            <label htmlFor={item.value} className={cx('allowing-label')}>
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Allow);
