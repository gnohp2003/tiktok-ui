import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import FormModal from './FormModal';

const cx = classNames.bind(styles);

function Modal() {
  return (
    <div className={cx('modal-container')}>
      <FormModal />
    </div>
  );
}

export default Modal;
