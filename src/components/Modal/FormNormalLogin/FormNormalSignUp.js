import classNames from 'classnames/bind';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import styles from './FormNormalLogin.module.scss';
import {
  ErrorIcon,
  HidePasswordIcon,
  LoadIcon,
  ShowPasswordIcon,
  TickIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import * as userServices from '~/services/userServices';
// import config from '~/config';
import { useAuth } from '~/context';

const cx = classNames.bind(styles);

function FormNormalSignUp({ closeForm }) {
  // show password state
  const [togglePassword, setTogglePassword] = useState(false);
  // input state (email, password)
  const [input, setInput] = useState({
    type: 'email',
    email: '',
    password: '',
  });
  // loading state, while requesting
  const [loading, setLoading] = useState(false);
  // when input is invalid or valid
  const [isInputValue, setIsInputValue] = useState(false);
  // error state, when request failed
  const [error, setError] = useState('');
  // check valid password
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const passwordRef = useRef();
  const submitRef = useRef();
  // const navigate = useNavigate();
  const { setAuth, setToken, setIsAuth } = useAuth();
  // effect to handle disable button
  useEffect(() => {
    const isEmailEmpty = input.email !== '';
    const isPasswordEmpty = input.password !== '';
    submitRef.current.setAttribute('disabled', '');
    if (isEmailEmpty && isPasswordEmpty && isValid) {
      submitRef.current.removeAttribute('disabled', '');
    }
  }, [input, isValid]);

  // effect to change type of password input
  useEffect(() => {
    passwordRef.current.type = togglePassword ? 'text' : 'password';
  }, [togglePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await userServices.signup(input);
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
        toast('Account has been created successfully');
        setInput({ email: '', password: '' });
        setIsInputValue(false);
        closeForm();
        setTimeout(() => window.location.reload(), 3000);
        // return navigate(config.routes.home, { replace: true });
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError('Email already exist');
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

    if (name === 'password') {
      if (value.length >= 6) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordBlur = (e) => {
    const passwordValue = e.target.value;
    if (passwordValue.length > 0 && passwordValue.length < 6) {
      setIsInputValue(true);
      setIsValid(false);
      setIsInvalid(true);
    } else if (passwordValue.length >= 6) {
      setIsInputValue(false);
      setIsValid(true);
      setIsInvalid(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsInputValue(false);
    setIsInvalid(false);
    setError('');
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Sign Up</h2>
      <div className={cx('description')}>
        Email
        <a
          href="...#"
          className={cx('phone-sign-up-link')}
          onClick={(e) => e.preventDefault()}
        >
          Sign up with phone
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
            onFocus={() => setError('')}
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
            onBlur={handlePasswordBlur}
            onFocus={handlePasswordFocus}
          />
          <p className={cx('desc-title-rule', { invalid: isInvalid })}>
            Your password must have:
          </p>
          <div className={cx('password-rule')}>
            <TickIcon width="1.2rem" height="1.2rem" />
            <span
              className={cx({
                error: isInvalid,
                valid: isValid,
              })}
            >
              At least 6 characters.
            </span>
          </div>
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
        <Button ref={submitRef} primary className={cx('sign-up-btn')}>
          {loading && <LoadIcon width="1.8rem" height="1.8rem" />}
          <span className={cx('submit-btn-text')}>Sign up</span>
        </Button>
      </form>
      <div className={cx('form-agreement')}>
        <p className={cx('agreement-text')}>
          By continuing with an account located in{' '}
          <a className={cx('agreement-link')} href="...">
            Vietnam
          </a>
          , you agree to our{' '}
          <a className={cx('agreement-link')} href="...">
            Terms of Service
          </a>{' '}
          and acknowledge that you have read our{' '}
          <a className={cx('agreement-link')} href="...">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default FormNormalSignUp;
