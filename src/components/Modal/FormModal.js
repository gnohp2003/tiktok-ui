import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './Modal.module.scss';
import { useStore } from '~/context';
import FormModalLogin from './FormModalLogin';
import FormModalSignUp from './FormModalSignUp';

const cx = classNames.bind(styles);

function FormModal() {
  const [displayBtn, setDisplayBtn] = useState(true);
  const [hideMoreBtn, setHideMoreBtn] = useState(false);
  const [formNormalLogin, setFormNormalLogin] = useState(false);
  const [displayForm, setDisplayForm] = useStore().displayForm;
  const [loginForm, setLoginForm] = useState(true);

  const { headerRef } = useStore();
  const formRef = useRef();

  const handleDisplayMoreBtn = () => {
    setDisplayBtn((prev) => !prev);
    setHideMoreBtn((prev) => !prev);
  };

  useEffect(() => {
    if (displayForm) {
      formRef.current.parentElement.style.display = 'flex';
      formRef.current.parentElement.setAttribute('open', '');
      formRef.current.setAttribute('open', '');
    }
  }, [displayForm]);

  const handleCloseForm = () => {
    formRef.current.removeAttribute('open');
    formRef.current.setAttribute('close', '');
    formRef.current.parentElement.removeAttribute('open');
    formRef.current.parentElement.setAttribute('close', '');

    setTimeout(() => {
      formRef.current.parentElement.style.display = 'none';
      formRef.current.parentElement.removeAttribute('close');
      formRef.current.removeAttribute('close');
      headerRef?.current?.removeAttribute('add-padding');
    }, 500);

    setFormNormalLogin(false);
    setDisplayForm(false);
    setLoginForm(true);

    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');
    htmlElement.removeAttribute('change-scrollbar-color');
    bodyElement.removeAttribute('change-overflow');
  };

  const handleNormalLogin = () => setFormNormalLogin((prev) => !prev);
  const handleBack = () => setFormNormalLogin(false);

  const handleLoginForm = (e) => {
    e.preventDefault();
    setLoginForm((prev) => !prev);
  };

  return (
    <div ref={formRef} className={cx('form-container')}>
      {loginForm ? (
        <FormModalLogin
          formNormalLogin={formNormalLogin}
          handleBack={handleBack}
          handleCloseForm={handleCloseForm}
          handleNormalLogin={handleNormalLogin}
          displayBtn={displayBtn}
          hideMoreBtn={hideMoreBtn}
          handleDisplayMoreBtn={handleDisplayMoreBtn}
        />
      ) : (
        <FormModalSignUp
          formNormalLogin={formNormalLogin}
          handleBack={handleBack}
          handleCloseForm={handleCloseForm}
          handleNormalLogin={handleNormalLogin}
          handleDisplayMoreBtn={handleDisplayMoreBtn}
        />
      )}

      <div className={cx('form-footer')}>
        {loginForm ? (
          <>
            <div className={cx('footer-text')}>Don't have an account?</div>
            <a className={cx('footer-link')} href="/" onClick={handleLoginForm}>
              Sign up
            </a>
          </>
        ) : (
          <>
            <div className={cx('footer-text')}>Already have an account?</div>
            <a className={cx('footer-link')} href="/" onClick={handleLoginForm}>
              Log in
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default FormModal;
