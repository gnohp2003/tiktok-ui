import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItems';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <Tippy
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
        </Tippy>
        <div className={cx('actions')}>
          <Button className={cx('upload-btn')} text to="/Following" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          <Button primary>Log in</Button>
          <span className={cx('more-menu-icon')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
