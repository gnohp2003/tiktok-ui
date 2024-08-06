import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

import styles from './UserPopup.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import { AvatarEditIcon, TickIcon, XIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { ProfileContext } from '~/pages/Profile/Profile';
import { useDebounce } from '~/hooks';
import * as userService from '~/services/userServices';

const cx = classNames.bind(styles);

function UserPopup() {
  const { userData, showUserPopup, setShowUserPopup } =
    useContext(ProfileContext);

  const [file, setFile] = useState(null);
  const [nickname, setNickname] = useState(userData?.nickname);
  const [firstName, setFirstName] = useState(userData?.first_name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [bio, setBio] = useState(userData?.bio);
  const [disabledBtn, setDisabledBtn] = useState(true);
  // username loading
  const [loading, setLoading] = useState(false);
  // username fake response
  const [usernameCheck, setUsernameCheck] = useState(false);
  // bio count letter
  const [overLetter, setOverLetter] = useState(false);
  // username debounce
  const usernameDebounceValue = useDebounce(nickname, 800);

  const popupRef = useRef();
  const formPopupRef = useRef();

  useEffect(() => {
    if (
      file ||
      (usernameDebounceValue !== '' &&
        usernameDebounceValue !== userData?.nickname) ||
      (firstName !== '' && firstName !== userData?.first_name) ||
      (lastName !== '' && lastName !== userData?.last_name) ||
      bio !== userData?.bio
    ) {
      if (!usernameCheck && !overLetter) {
        setDisabledBtn(false);
      }
    }

    if (!file) {
      if (
        usernameDebounceValue === '' ||
        usernameDebounceValue === userData?.nickname
      ) {
        if (firstName === '' || firstName === userData?.first_name) {
          if (lastName === '' || lastName === userData?.last_name) {
            if (bio === userData?.bio) {
              setDisabledBtn(true);
            }
          }
        }
      }
    }

    if (bio?.length > 80) {
      setOverLetter(true);
    } else if (bio?.length <= 80) {
      setOverLetter(false);
    }

    (usernameCheck || overLetter) && setDisabledBtn(true);

    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    file,
    usernameDebounceValue,
    firstName,
    lastName,
    bio,
    usernameCheck,
    overLetter,
  ]);

  useEffect(() => {
    if (usernameDebounceValue === userData?.nickname) return;
    const userCheck = async () => {
      setLoading(true);
      setDisabledBtn(true);
      const response = await userService.user('@' + usernameDebounceValue);
      if (response) {
        setUsernameCheck(true);
      } else if (!response && usernameDebounceValue !== '') {
        setUsernameCheck(false);
        setDisabledBtn(false);
      }
      setLoading(false);
    };

    if (usernameDebounceValue === '') setUsernameCheck(true);

    userCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameDebounceValue]);

  const hanldleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
    }
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      delete file.preview;
      formData.append('avatar', file);
    }
    if (firstName !== userData?.first_name)
      formData.append('first_name', firstName);
    if (lastName !== userData?.last_name)
      formData.append('last_name', lastName);
    if (bio !== userData?.bio) formData.append('bio', bio);
    formData.append('nickname', usernameDebounceValue);

    const updateUser = async () => {
      const response = await userService.update(formData);
      if (response) {
        const currentURL = window.location.href;
        const newURL =
          currentURL.substring(0, currentURL.indexOf('@') + 1) +
          response.nickname;

        handleClose();
        toast('Profile has been updated');
        setTimeout(() => {
          window.location.replace(newURL);
        }, 2000);
      } else {
        handleClose();
        toast('Failed to update. Invalid data');
      }
    };

    updateUser();
  };

  useEffect(() => {
    let timer;
    if (showUserPopup) {
      timer = setTimeout(() => {
        popupRef.current.style.opacity = '1';
        formPopupRef.current.style.opacity = '1';
        formPopupRef.current.style.transform = 'scale(1)';
      }, 100);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showUserPopup]);

  const handleClose = (e) => {
    e && e.preventDefault();
    popupRef.current.style.opacity = '0';
    formPopupRef.current.style.opacity = '0';
    setTimeout(() => {
      setShowUserPopup(false);
    }, 500);
  };

  return (
    <div ref={popupRef} className={cx('popup-container')}>
      <PoperWrapper ref={formPopupRef} className={cx('form-wrapper')}>
        <form className={cx('form-edit')}>
          <div className={cx('form-heading')}>
            <h1 className={cx('heading-title')}>Edit profile</h1>
            <div className={cx('close-btn')} onClick={handleClose}>
              <XIcon width="2.4rem" height="2.4rem" />
            </div>
          </div>
          <div className={cx('form-body')}>
            <div className={cx('form-group', 'form-avatar')}>
              <div className={cx('form-label')}>Profile photo</div>
              <div className={cx('avatar-container')}>
                <img
                  className={cx('avatar')}
                  src={file?.preview || userData?.avatar}
                  alt=""
                />
                <div className={cx('avatar-btn')}>
                  <AvatarEditIcon width="1.6rem" height="1.6rem" />
                </div>
                <input
                  className={cx('file-input')}
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  onChange={hanldleChangeFile}
                />
              </div>
            </div>
            <div className={cx('form-group', 'form-username')}>
              <div className={cx('form-label')}>Username</div>
              <div className={cx('username-container')}>
                <input
                  value={nickname}
                  type="text"
                  className={cx('username-input', {
                    'username-input-error': usernameCheck,
                  })}
                  onChange={(e) => {
                    setDisabledBtn(true);
                    setNickname(e.target.value);
                  }}
                />
                {loading && (
                  <div className={cx('username-icon-box')}>
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      className={cx('username-loading-icon')}
                    />
                  </div>
                )}
                {!usernameCheck &&
                  usernameDebounceValue !== userData?.nickname &&
                  !loading && (
                    <TickIcon
                      width="1.6rem"
                      height="1.6rem"
                      className={cx('username-tick-icon')}
                    />
                  )}
                {usernameCheck && (
                  <p className={cx('username-error')}>
                    This username isn’t available. Please enter a new one.
                  </p>
                )}
                <p className={cx('username-url')}>www.tiktok.com/@{nickname}</p>
                <p className={cx('username-tip')}>
                  Usernames can only contain letters, numbers, underscores, and
                  periods. Changing your username will also change your profile
                  link.
                </p>
              </div>
            </div>
            <div className={cx('form-group', 'form-first-name')}>
              <div className={cx('form-label')}>First name</div>
              <input
                value={firstName}
                type="text"
                className={cx('first-name-input')}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={cx('form-group', 'form-last-name')}>
              <div className={cx('form-label')}>Last name</div>
              <input
                value={lastName}
                type="text"
                className={cx('last-name-input')}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={cx('form-group', 'form-bio')}>
              <div className={cx('form-label')}>Bio</div>
              <div className={cx('bio-container')}>
                <textarea
                  value={bio}
                  className={cx('bio-input', { 'bio-input-error': overLetter })}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className={cx('text-count')}>
                  <span className={cx({ 'count-letter': overLetter })}>
                    {bio?.length || 0}
                  </span>
                  /80
                </div>
              </div>
            </div>
          </div>
          <div className={cx('form-footer')}>
            <Button
              outline
              className={cx('form-btn', 'cancel-btn')}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              primary
              className={cx('form-btn', 'save-btn', { disabled: disabledBtn })}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </PoperWrapper>
    </div>
  );
}

export default UserPopup;
