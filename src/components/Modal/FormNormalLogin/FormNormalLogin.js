import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import styles from './FormNormalLogin.module.scss';
import {
  ErrorIcon,
  HidePasswordIcon,
  LoadIcon,
  ShowPasswordIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import * as userServices from '~/services/userServices';
import config from '~/config';
import { useAuth } from '~/context';

const cx = classNames.bind(styles);

function FormNormalLogin({ closeForm }) {
  // show password state
  const [togglePassword, setTogglePassword] = useState(false);
  // input state (email, password)
  const [input, setInput] = useState({ email: '', password: '' });
  // loading state, while requesting
  const [loading, setLoading] = useState(false);
  // when input is invalid or valid
  const [isInputValue, setIsInputValue] = useState(false);
  // error state, when request failed
  const [error, setError] = useState('');

  const passwordRef = useRef();
  const submitRef = useRef();
  const navigate = useNavigate();
  const { setAuth, setToken, setIsAuth } = useAuth();
  // effect to handle disable button
  useEffect(() => {
    const isEmailEmpty = input.email !== '';
    const isPasswordEmpty = input.password !== '';
    submitRef.current.setAttribute('disabled', '');
    if (isEmailEmpty && isPasswordEmpty) {
      submitRef.current.removeAttribute('disabled', '');
    }
  }, [input]);

  // effect to change type of password input
  useEffect(() => {
    passwordRef.current.type = togglePassword ? 'text' : 'password';
  }, [togglePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await userServices.login(input);
      if (response) {
        setAuth(response.data);
        setIsAuth(true);
        setToken(response.meta.token);
        localStorage.setItem(
          'site',
          JSON.stringify({
            token: response.meta.token,
            uid: response.data.id,
          }),
        );
        toast('Logged in');
        setInput({ email: '', password: '' });
        setIsInputValue(false);
        closeForm();
        setTimeout(() => window.location.reload(), 3000);
        // return navigate(config.routes.home, { replace: false });
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError('Unauthorized');
        setIsInputValue(true);
      }
    }
    setLoading(false);
  };

  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Log in</h2>
      <div className={cx('description')}>
        Email
        <a
          href="...#"
          className={cx('phone-login-link')}
          onClick={(e) => e.preventDefault()}
        >
          Log in with phone
        </a>
      </div>
      <form className={'form'} onSubmit={handleSubmit}>
        <div className={cx('form-group')}>
          <input
            type="email"
            name="email"
            value={input.email}
            className={cx('input', 'input-email')}
            placeholder="Enter your email"
            required
            onChange={handleInput}
          />
        </div>
        <div className={cx('form-group', 'group-password')}>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            value={input.password}
            className={cx('input', 'input-password', {
              error: isInputValue,
            })}
            placeholder="Password"
            required
            onChange={handleInput}
          />
          <div className={cx('icon-container')} onClick={handleTogglePassword}>
            {isInputValue && (
              <ErrorIcon
                className={cx('error-icon')}
                width="1.4rem"
                height="1.4rem"
              />
            )}
            <span className={cx('icon')}>
              {togglePassword ? (
                <ShowPasswordIcon width="2rem" height="2rem" />
              ) : (
                <HidePasswordIcon width="2rem" height="2rem" />
              )}
            </span>
          </div>
        </div>
        {isInputValue && (
          <div className={cx('error-container')}>
            <span className={'error-text'}>{error}</span>
          </div>
        )}
        <a href="..." className={cx('forgot-password-link')}>
          Forgot password?
        </a>
        <Button ref={submitRef} primary className={cx('submit-btn')}>
          {loading && <LoadIcon width="1.8rem" height="1.8rem" />}
          <span className={cx('submit-btn-text')}>Log in</span>
        </Button>
      </form>
    </div>
  );
}

export default FormNormalLogin;
