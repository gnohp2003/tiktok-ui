import classNames from 'classnames/bind';

import styles from './Creator.module.scss';
import UploadSpace from './UploadSpace';
import UploadForm from './UploadForm/UploadForm';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const CreatorContext = createContext();
function Creator() {
  const [uploadFile, setUploadFile] = useState(null);

  const value = { uploadFile, setUploadFile };

  return (
    <CreatorContext.Provider value={value}>
      <div className={cx('wrapper')}>
        {uploadFile ? <UploadForm /> : <UploadSpace />}
        {/* <UploadForm /> */}
      </div>
    </CreatorContext.Provider>
  );
}

export default Creator;
