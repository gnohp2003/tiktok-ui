import classNames from 'classnames/bind';

import styles from './UploadForm.module.scss';
import { memo, useContext, useEffect } from 'react';
import { SharpIcon, TagIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { toast } from 'sonner';
import { UploadFormContext } from './UploadForm';

const cx = classNames.bind(styles);

function Description({ fileInfo, alterFile }) {
  const { uploadData, setUploadData } = useContext(UploadFormContext);

  const handleChangeDescription = (e) => {
    if (e.target.value.length > 500) {
      toast('Maximum 500 characters');
      return;
    }

    setUploadData((prev) => ({ ...prev, description: e.target.value }));
  };

  useEffect(() => {
    const defaultDescription = fileInfo?.name.substring(
      0,
      fileInfo?.name.indexOf('.mp4'),
    );

    setUploadData((prev) => ({ ...prev, description: defaultDescription }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileInfo]);

  useEffect(() => {
    alterFile && setUploadData((prev) => ({ ...prev, description: '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alterFile]);

  const handleClickHashtag = () => {
    setUploadData((prev) => ({
      ...prev,
      description: prev.description ? prev.description + '#' : '#',
    }));
  };

  const handleClickTag = () => {
    setUploadData((prev) => ({
      ...prev,
      description: prev.description ? prev.description + '@' : '@',
    }));
  };

  return (
    <div className={cx('description', 'edit-section')}>
      <div className={cx('title')}>Description</div>
      <textarea
        className={cx('description-input')}
        value={uploadData?.description}
        onChange={(e) => handleChangeDescription(e)}
      />
      <div className={cx('tool-bar')}>
        <div className={cx('tool-bar-action')}>
          <Button
            className={cx('hashtag-btn')}
            leftIcon={<SharpIcon width="1.4rem" height="1.4rem" />}
            onClick={handleClickHashtag}
          >
            Hashtags
          </Button>
          <Button
            className={cx('mention-btn')}
            leftIcon={<TagIcon width="1.4rem" height="1.4rem" />}
            onClick={handleClickTag}
          >
            Mention
          </Button>
        </div>
        <span className={cx('count-letter')}>
          {uploadData?.description?.length || 0}/500
        </span>
      </div>
    </div>
  );
}

export default memo(Description);
