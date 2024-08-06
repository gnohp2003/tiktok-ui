import { useContext, useRef } from 'react';
import classNames from 'classnames/bind';

import { CreatorContext } from './Creator';
import styles from './Creator.module.scss';
import { UploadIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { toast } from 'sonner';

const cx = classNames.bind(styles);

const LIMIT_FILE_SIZE = 15728640; //byte binary

function UploadGroup({ height = false, button = false }) {
  const { setUploadFile } = useContext(CreatorContext);

  const fileInputRef = useRef();
  const uploadGroupRef = useRef();

  const handleSelect = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file?.size > LIMIT_FILE_SIZE) {
      toast('File is too large');
      return;
    }

    setUploadFile(file);
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];

    if (file?.size > LIMIT_FILE_SIZE) {
      toast('File is too large');
      return;
    }

    setUploadFile(file);
  };

  return (
    <div
      ref={uploadGroupRef}
      className={cx('upload-group')}
      onClick={handleSelect}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      style={{ height: height ? height : '100%' }}
    >
      <input
        ref={fileInputRef}
        type="file"
        title=""
        accept="video/*"
        className={cx('file-input')}
        onChange={handleUploadFile}
      />
      <div className={cx('upload-content')}>
        <UploadIcon
          className={cx('upload-icon')}
          width="7.2rem"
          height="7.2rem"
        />
        <div className={cx('text-container')}>
          <div className={cx('title')}>Select video to upload</div>
          <div className={cx('sub-title')}>Or drag and drop it here</div>
          {button && (
            <Button
              className={cx('select-btn')}
              primary
              onClick={(e) => handleSelect(e)}
            >
              Select video
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadGroup;
