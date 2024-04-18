import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
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
import config from '~/config';

const cx = classNames.bind(styles);

const currentUser = 'phong';

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
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
            activeIcon={<FollowingIconSolid width="2.4rem" height="2.4rem" />}
            to={config.routes.following}
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
            avatar="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7311976317673570350~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1712833200&x-signature=6B6Pd%2FnTZp2Y9d2HLaQ%2FY7ItBA8%3D"
            to={'/@' + currentUser}
          />
        </Navigation>
      </div>
    </aside>
  );
}

export default Sidebar;
