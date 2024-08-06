import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './UploadForm.module.scss';
import Button from '~/components/Button';
import { useStore } from '~/context';
import config from '~/config';

const cx = classNames.bind(styles);

function Modal({ setAlterFile, setUploadCompleted }) {
  const { uploadHeaderRef, handleCloseModal } = useStore();
  const navigate = useNavigate();

  const handleClickPosts = () => {
    handleCloseModal();
    uploadHeaderRef.current.removeAttribute('add-padding');

    return navigate(config.routes.posts, { replace: true });
  };

  const handleClickUpload = () => {
    setAlterFile(true);
    setUploadCompleted(false);

    handleCloseModal();

    uploadHeaderRef.current.removeAttribute('add-padding');
  };

  return (
    <div className={cx('modal-container')}>
      <div className={cx('modal-content')}>
        <div className={cx('modal-title')}>Your video has been uploaded</div>
        <div className={cx('modal-subtitle')}>
          You can manage your posts or upload another video.
        </div>
        <div className={cx('modal-action')}>
          <Button className={cx('modal-posts-btn')} onClick={handleClickPosts}>
            Manage posts
          </Button>
          <Button
            className={cx('modal-upload-btn')}
            primary
            onClick={handleClickUpload}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
