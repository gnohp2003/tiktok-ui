import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items, onChange = defaultFn }) {
  const [historyMenu, setHistoryMenu] = useState([{ data: items }]);

  const currentMenu = historyMenu[historyMenu.length - 1];

  const renderItems = () =>
    currentMenu.data.map((item, index) => {
      const hasChildren = !!item.children;

      return (
        <MenuItem
          key={index}
          item={item}
          onClick={() => {
            hasChildren ? setHistoryMenu((prev) => [...prev, item.children]) : onChange(item);
          }}
        />
      );
    });

  return (
    <Tippy
      interactive="true"
      placement="bottom-end"
      offset={[12, 10]}
      render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-list')}>
            {historyMenu.length > 1 && (
              <Header
                title={currentMenu.title}
                onBack={() => {
                  setHistoryMenu((prev) => prev.splice(historyMenu.length - 1, 1));
                }}
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistoryMenu((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
