import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Modal.module.scss';
import FormNormalLogin from './FormNormalLogin/FormNormalLogin';
import {
  AppleIcon,
  ArrowBottomIcon,
  ArrowLeftIcon,
  FacebookIcon,
  GoogleIcon,
  KaokaoTalkIcon,
  LINEIcon,
  QrIcon,
  TwitterIcon,
  UserIcon,
  XIcon,
} from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function FormModalLogin({
  formNormalLogin,
  handleBack,
  handleCloseForm,
  handleNormalLogin,
  displayBtn,
  hideMoreBtn,
  handleDisplayMoreBtn,
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
          <FormNormalLogin closeForm={handleCloseForm} />
        ) : (
          <div className={cx('login-option-wrapper')}>
            <h2 className={cx('form-title')}>Log in to TikTok</h2>
            <div className={cx('login-option-container')}>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn')}
                  leftIcon={<QrIcon width="2rem" height="2rem" />}
                >
                  Use QR code
                </Button>
              </Tippy>
              <Tippy content="Use this" placement="top-end">
                <Button
                  className={cx('login-option-btn', { 'last-login': true })}
                  leftIcon={<UserIcon width="2rem" height="2rem" />}
                  onClick={handleNormalLogin}
                >
                  Use phone / email / username
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
                  className={cx('login-option-btn', {
                    'hide-login-btn': displayBtn,
                  })}
                  leftIcon={<TwitterIcon width="2rem" height="2rem" />}
                >
                  Continue with Twitter
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn', {
                    'hide-login-btn': displayBtn,
                  })}
                  leftIcon={<LINEIcon width="2rem" height="2rem" />}
                >
                  Continue with LINE
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn', {
                    'hide-login-btn': displayBtn,
                  })}
                  leftIcon={<KaokaoTalkIcon width="2rem" height="2rem" />}
                >
                  Continue with KakaoTalk
                </Button>
              </Tippy>
              <Tippy content="Unavailable" placement="top-end">
                <Button
                  className={cx('login-option-btn', {
                    'hide-login-btn': displayBtn,
                  })}
                  leftIcon={<AppleIcon width="2rem" height="2rem" />}
                >
                  Continue with Apple
                </Button>
              </Tippy>
              <div
                className={cx('see-more-btn', {
                  'hide-more-btn': hideMoreBtn,
                })}
                onClick={handleDisplayMoreBtn}
              >
                <ArrowBottomIcon width="2rem" height="2rem" />
              </div>
            </div>
            <div className={cx('separator-wrapper')}>
              <div className={cx('separator-line')}></div>
              <div className={cx('separator-text')}>OR</div>
            </div>
            <div className={cx('guest-btn-container')}>
              <Button primary className={cx('login-guest-btn')}>
                Continue as guest
              </Button>
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

export default FormModalLogin;
