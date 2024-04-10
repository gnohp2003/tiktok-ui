import {
  faCircleNotch,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItems';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([1]);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  const handleHideSearchResult = () => setShowSearchResult(false);

  return (
    <HeadlessTippy
      interactive
      visible={showSearchResult && searchResult.length > 0}
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
      onClickOutside={handleHideSearchResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          className={cx('search-input')}
          placeholder="Search"
          spellCheck="false"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowSearchResult(true)}
        />
        <button className={cx('clear-btn')} onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <FontAwesomeIcon className={cx('loading-icon')} icon={faCircleNotch} />
        <button className={cx('search-btn')}>
          <SearchIcon
            className={cx('search-icon')}
            width="2.4rem"
            height="2.4rem"
          />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
