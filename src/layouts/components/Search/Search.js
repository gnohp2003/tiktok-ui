import {
  faCircleNotch,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchServices';
import SearchItems from './SearchItems';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounceValue = useDebounce(searchValue, 800);
  const inputRef = useRef();

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    // call api
    (async () => {
      setLoading(true);
      const result = await searchServices.search(debounceValue);
      setSearchResult(result);
      setLoading(false);
    })();
  }, [debounceValue]);

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  const handleHideSearchResult = () => setShowSearchResult(false);
  const handleSearchButton = () => inputRef.current.blur();

  const renderResult = (attrs) => (
    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        <div className={cx('search-label')}>Accounts</div>
        {
          <SearchItems
            searchResult={searchResult}
            handleHideSearchResult={handleHideSearchResult}
          />
        }
      </PopperWrapper>
    </div>
  );

  const handleCheckWhiteSpace = (e) =>
    !e.target.value.startsWith(' ') && setSearchValue(e.target.value);

  return (
    // the div tag contains tippy with the purpose removes warning from tippy.
    <div>
      <HeadlessTippy
        interactive
        visible={showSearchResult && searchResult.length > 0}
        render={renderResult}
        onClickOutside={handleHideSearchResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            className={cx('search-input')}
            placeholder="Search"
            spellCheck="false"
            value={searchValue}
            onChange={handleCheckWhiteSpace}
            onFocus={() => setShowSearchResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear-btn')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon
              className={cx('loading-icon')}
              icon={faCircleNotch}
            />
          )}
          <button className={cx('search-btn')}>
            <SearchIcon
              className={cx('search-icon')}
              width="2.4rem"
              height="2.4rem"
              onClick={handleSearchButton}
            />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
