import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { Link } from 'react-router-dom';
import {
  BookMarkIcon,
  CoinsIcon,
  FeedbackIcon,
  InboxIcon,
  KeyboardIcon,
  LanguageIcon,
  LiveCreatorIcon,
  LiveIcon,
  LogoutIcon,
  MessageIcon,
  SettingIcon,
  UserIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { useStore } from '~/context';
import { useAuth } from '~/context';
import { useEffect, useRef, useState } from 'react';
import MenuItem from '~/components/Popper/Menu/MenuItem';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LiveCreatorIcon width="2rem" height="2rem" />,
    title: 'LIVE CREATOR HUB',
    to: '/live',
  },
  {
    icon: <LanguageIcon width="2rem" height="2rem" />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Vietnamese',
        },
        {
          type: 'language',
          code: 'zh',
          title: 'Chinese',
        },
        {
          type: 'language',
          code: 'ja',
          title: 'Japanese',
        },
        {
          type: 'language',
          code: 'ko',
          title: 'Korean',
        },
        {
          type: 'language',
          code: 'cs',
          title: 'Czech',
        },
        {
          type: 'language',
          code: 'nl',
          title: 'Dutch',
        },
        {
          type: 'language',
          code: 'fr',
          title: 'French',
        },
        {
          type: 'language',
          code: 'de',
          title: 'German',
        },
        {
          type: 'language',
          code: 'it',
          title: 'Italian',
        },
        {
          type: 'language',
          code: 'lo',
          title: 'Lao',
        },
        {
          type: 'language',
          code: 'la',
          title: 'Latin',
        },
        {
          type: 'language',
          code: 'pt',
          title: 'Portuguese',
        },
        {
          type: 'language',
          code: 'ru',
          title: 'Russian',
        },
      ],
    },
  },
  {
    icon: <FeedbackIcon width="2rem" height="2rem" />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon width="2rem" height="2rem" />,
    title: 'Keyboard shortcuts',
  },
];

const USER_MENU = [
  {
    icon: <UserIcon width="2rem" height="2rem" />,
    title: 'View profile',
    to: '/profile',
  },
  {
    icon: <BookMarkIcon width="2rem" height="2rem" />,
    title: 'Favorites',
    to: '/favorites',
  },
  {
    icon: <CoinsIcon width="2rem" height="2rem" />,
    title: 'Get Coins',
    to: '/profile',
  },
  {
    icon: <LiveIcon width="2rem" height="2rem" />,
    title: 'LIVE Studio',
    to: '/profile',
  },
  ...MENU_ITEMS,
  {
    icon: <SettingIcon width="2rem" height="2rem" />,
    title: 'Settings',
    to: '/profile',
  },
  {
    icon: <LogoutIcon width="2rem" height="2rem" />,
    title: 'Log out',
    // to: '/live',
    separate: true,
  },
];

function Header() {
  const { handleDisplayForm } = useStore();
  const { headerRef } = useStore();
  const { auth, setAuth, isAuth, setIsAuth, setToken } = useAuth();

  const handleMenuChange = (item) => {
    switch (item.title) {
      case 'Log out':
        setAuth({});
        setIsAuth(false);
        setToken('');
        localStorage.removeItem('site');
        window.location.reload();
        break;
      default:
        console.log('haizzzzzzzz');
        break;
    }
  };

  const handleClickUpLoad = (e) => {
    if (!isAuth) {
      e.preventDefault();
      handleDisplayForm();
    }
  };

  return (
    <header ref={headerRef} className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </Link>
        {/* search */}
        <Search />
        <div className={cx('actions')}>
          {isAuth ? (
            <>
              <Button
                className={cx('upload-btn')}
                text
                to={config.routes.creator}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Upload
              </Button>
              <Tippy delay={[0, 200]} content="Messages">
                <Link to="" className={cx('action-link')}>
                  <button className={cx('action-btn', 'message')}>
                    <MessageIcon width="2.6rem" height="2.6rem" />
                  </button>
                </Link>
              </Tippy>
              <Tippy delay={[0, 200]} content="Inbox">
                <button className={cx('action-btn', 'inbox')}>
                  <InboxIcon />
                </button>
              </Tippy>
              <span className={cx('sup-badge')}>27</span>
              <Menu items={USER_MENU} onChange={handleMenuChange}>
                <Image
                  className={cx('user-avatar')}
                  src={auth.avatar}
                  alt="avatar"
                />
              </Menu>
            </>
          ) : (
            <>
              <Button
                className={cx('upload-btn')}
                text
                to="/Following"
                onClick={(e) => handleClickUpLoad(e)}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Upload
              </Button>
              <Button primary onClick={handleDisplayForm}>
                Log in
              </Button>
              <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                <button className={cx('more-menu-icon')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
