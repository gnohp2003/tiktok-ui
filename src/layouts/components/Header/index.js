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
    to: '/live',
    separate: true,
  },
];

const handleMenuChange = (item) => {
  console.log(item);
};

function Header() {
  const currentUser = true;

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </Link>
        {/* search */}
        <Search />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button
                className={cx('upload-btn')}
                text
                to={config.routes.upload}
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
            </>
          ) : (
            <>
              <Button
                className={cx('upload-btn')}
                text
                to="/Following"
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Upload
              </Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu
            items={currentUser ? USER_MENU : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7311976317673570350~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1712833200&x-signature=6B6Pd%2FnTZp2Y9d2HLaQ%2FY7ItBA8%3D"
                alt="avatar"
              />
            ) : (
              <button className={cx('more-menu-icon')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
