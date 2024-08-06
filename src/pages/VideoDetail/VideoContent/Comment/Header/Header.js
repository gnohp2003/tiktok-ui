import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import DescriptionContent from './DescriptionContent';
import MainContent from './MainContent';

const cx = classNames.bind(styles);

const Header = () => {
  window.onload = () => {
    const prevData = JSON.parse(localStorage.getItem('site'));

    prevData.is_followed_lists && delete prevData.is_followed_lists;

    prevData.is_liked_lists && delete prevData.is_liked_lists;

    localStorage.setItem('site', JSON.stringify(prevData));
  };

  return (
    <div className={cx('wrapper')}>
      <DescriptionContent />
      <MainContent />
    </div>
  );
};

export default Header;
