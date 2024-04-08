import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCircleNotch,
  faCircleXmark,
  faCoins,
  faEllipsisVertical,
  faGear,
  faLanguage,
  faMagnifyingGlass,
  faPlus,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItems';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
  faBookmark,
  faCircleQuestion,
  faEnvelope,
  faKeyboard,
  faLightbulb,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    title: 'LIVE CREATOR HUB',
    to: '/live',
  },
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
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
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

const USER_MENU = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'View profile',
    to: '/profile',
  },
  {
    icon: <FontAwesomeIcon icon={faBookmark} />,
    title: 'Favorites',
    to: '/favorites',
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: 'Get Coins',
    to: '/profile',
  },
  {
    icon: <FontAwesomeIcon icon={faVideo} />,
    title: 'LIVE Studio',
    to: '/profile',
  },
  ...MENU_ITEMS,
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Settings',
    to: '/profile',
  },
  {
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    title: 'Log out',
    to: '/live',
    separate: true,
  },
];

const handleMenuChange = (item) => {
  console.log(item);
};

function Header() {
  const [searchResult, setSearchResult] = useState([]);
  const currentUser = true;

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <HeadlessTippy
          interactive
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <div className={cx('search-label')}>Accounts</div>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input className={cx('search-input')} placeholder="Search accounts and videos" spellCheck="false" />
            <button className={cx('clear-btn')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading-icon')} icon={faCircleNotch} />
            <button className={cx('search-btn')}>
              <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button className={cx('upload-btn')} text to="/Following" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy delay={[0, 200]} content="Messages">
                <Link to="" className={cx('action-link')}>
                  <button className={cx('action-btn')}>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                </Link>
              </Tippy>
              <Tippy delay={[0, 200]} content="Inbox">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button className={cx('upload-btn')} text to="/Following" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('user-avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/a1378e99fc7a49137c8c1e9180c38b94.jpeg?lk3s=a5d48078&x-expires=1712710800&x-signature=fWOhUh2oW3tZpW0CQwfcNNZMgwA%3D"
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
