import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Modal.module.scss';
import FormNormalSignUp from './FormNormalLogin/FormNormalSignUp';
import {
  ArrowLeftIcon,
  FacebookIcon,
  GoogleIcon,
  KaokaoTalkIcon,
  LINEIcon,
  UserIcon,
  XIcon,
} from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function FormModalSignUp({
  formNormalLogin,
  handleBack,
  handleCloseForm,
  handleNormalLogin,
}) {
  return (
    <>
      <div className={cx('form-heading')}>
        <div className={cx('action')}>
          {formNormalLogin && (
            <div className={cx('back-btn')} onClick={handleBack}>
              <ArrowLeftIcon width="2.4rem" height="2.4rem" />
            </div>
          )}
          <div className={cx('close-btn')} onClick={handleCloseForm}>
            <XIcon width="1.5rem" height="1.5rem" />
          </div>
        </div>
      </div>
      <div className={cx('login-body')}>
        {formNormalLogin ? (
          <FormNormalSignUp closeForm={handleCloseForm} />
        ) : (
          <div className={cx('login-option-wrapper')}>
            <h2 className={cx('form-title')}>Sign up for TikTok</h2>
            <div className={cx('signup-option-container')}>
              <Tippy content="Use this" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<UserIcon width="2rem" height="2rem" />}
                  onClick={handleNormalLogin}
                >
                  Use phone or email
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<FacebookIcon width="2rem" height="2rem" />}
                >
                  Continue with Facebook
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<GoogleIcon width="2rem" height="2rem" />}
                >
                  Continue with Google
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<LINEIcon width="2rem" height="2rem" />}
                >
                  Continue with LINE
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<KaokaoTalkIcon width="2rem" height="2rem" />}
                >
                  Continue with KakaoTalk
                </Button>
              </Tippy>
            </div>
          </div>
        )}
      </div>
      {!formNormalLogin && (
        <div className={cx('form-agreement')}>
          <p className={cx('agreement-text')}>
            By continuing with an account located in{' '}
            <a className={cx('agreement-link')} href="#">
              Vietnam
            </a>
            , you agree to our{' '}
            <a className={cx('agreement-link')} href="#">
              Terms of Service
            </a>{' '}
            and acknowledge that you have read our{' '}
            <a className={cx('agreement-link')} href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}

export default FormModalSignUp;
