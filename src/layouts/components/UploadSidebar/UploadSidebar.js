import classNames from 'classnames/bind';

import styles from './UploadSidebar.module.scss';
import { Navigation, NavigationItem } from '../Sidebar/Navigation';
import config from '~/config';
import {
  AnalystIcon,
  CommentIconRegular,
  CreatorAcademyIcon,
  FeedbackSquareIcon,
  HomeIconRegular,
  ListIcon,
} from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function UploadSidebar() {
  return (
    <div className={cx('wrapper') + ' col l-2'}>
      <div className={cx('fixed')}>
        <div className={cx('container')}>
          <Navigation>
            <NavigationItem
              title={'Upload'}
              icon
              to={config.routes.creator}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <div className={cx('nav-spacing')}></div>
            <hr className={cx('nav-line')} />
            <NavigationItem
              title={'Home'}
              icon={<HomeIconRegular width="2.4rem" height="2.4rem" />}
              to={config.routes.upload}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <NavigationItem
              title={'Posts'}
              icon={<ListIcon width="2.4rem" height="2.4rem" />}
              to={config.routes.posts}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <NavigationItem
              title={'Comments'}
              icon={<CommentIconRegular width="2.4rem" height="2.4rem" />}
              to={config.routes.comments}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <NavigationItem
              title={'Analytics'}
              icon={<AnalystIcon width="2.4rem" height="2.4rem" />}
              to={config.routes.analytics}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <NavigationItem
              title={'Feedback'}
              icon={<FeedbackSquareIcon width="2.4rem" height="2.4rem" />}
              to={config.routes.feedback}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
            <NavigationItem
              title={'Creator Academy'}
              icon={<CreatorAcademyIcon width="2.4rem" height="2.4rem" />}
              to={config.routes.creatorAcademy}
              className={cx('nav-item')}
              navActiveType="sidebar"
            />
          </Navigation>
          <footer className={cx('footer')}>
            <Button className={cx('back-btn')} to="/">
              Back to TikTok
            </Button>
            <hr className={cx('nav-line')} />
            <ul className={cx('footer-lists')}>
              <li className={cx('footer-item')}>Terms of Service</li>
              <li className={cx('footer-item')}>Privacy Policy</li>
            </ul>
            <div className={cx('copy-right')}>Copyright &copy; 2024 TikTok</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default UploadSidebar;
