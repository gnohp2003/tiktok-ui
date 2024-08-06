import classNames from 'classnames/bind';
import { Navigation, NavigationItem } from './Navigation';
import {
  HomeIconRegular,
  HomeIconSolid,
  FollowingIconRegular,
  FollowingIconSolid,
  FriendsIconRegular,
  FriendsIconSolid,
  ExploreIconRegular,
  ExploreIconSolid,
  LiveIconRegular,
  LiveIconSolid,
} from '~/components/Icons';
import { Scrollbars } from 'react-custom-scrollbars-2';

import config from '~/config';
import styles from './Sidebar.module.scss';
import FollowingAccounts from '~/components/FollowingAccounts';
import Footer from './Footer';
import { useAuth, useStore } from '~/context';

const cx = classNames.bind(styles);

function Sidebar() {
  const { auth, isAuth, token } = useAuth();
  const { handleDisplayForm } = useStore();
  const handleNav = (e, nav) => {
    switch (nav) {
      case 'following':
        if (token === '') {
          e.preventDefault();
          handleDisplayForm();
        }
        break;
      case 'profile':
        if (token === '') {
          e.preventDefault();
          handleDisplayForm();
        }
        break;
      default:
        console.log('Invalid navigation');
    }
  };

  return (
    <aside className={cx('wrapper') + ' col l-2'}>
      <div className={cx('fixed')}>
        <Scrollbars
          className={cx('custom-scrollbar')}
          autoHeight
          autoHeightMax={'100vh'}
          style={{ width: '240px' }}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: 'rgba(22, 24, 35, 0.06)',
                borderRadius: '3px',
                width: '6px',
              }}
            />
          )}
        >
          <div className={cx('nav-container')}>
            <Navigation>
              <NavigationItem
                title={'Not for me'}
                icon={<HomeIconRegular />}
                activeIcon={<HomeIconSolid />}
                to={config.routes.home}
              />
              <NavigationItem
                title={'Following'}
                icon={<FollowingIconRegular width="2.4rem" height="2.4rem" />}
                activeIcon={
                  <FollowingIconSolid width="2.4rem" height="2.4rem" />
                }
                to={config.routes.following}
                onClick={(e) => handleNav(e, 'following')}
              />
              <NavigationItem
                title={'Friends'}
                icon={<FriendsIconRegular />}
                activeIcon={<FriendsIconSolid />}
                to={config.routes.friends}
              />
              <NavigationItem
                title={'Explore'}
                icon={<ExploreIconRegular />}
                activeIcon={<ExploreIconSolid />}
                to={config.routes.explore}
              />
              <NavigationItem
                title={'LIVE'}
                icon={<LiveIconRegular />}
                activeIcon={<LiveIconSolid />}
                to={config.routes.live}
              />
              <NavigationItem
                title={'Profile'}
                avatar={auth.avatar}
                to={'/profile/@' + auth.nickname}
                onClick={(e) => handleNav(e, 'profile')}
              />
            </Navigation>
            {isAuth && <FollowingAccounts title="Following accounts" />}
            <Footer />
          </div>
        </Scrollbars>
      </div>
    </aside>
  );
}

export default Sidebar;
