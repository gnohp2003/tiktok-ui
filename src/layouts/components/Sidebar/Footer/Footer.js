import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import Image from '~/components/Image';
import FooterInfo from './FooterInfo';

const cx = classNames.bind(styles);

const companyItems = [
  {
    title: 'About',
    href: '/',
  },
  {
    title: 'Newsroom',
    href: '/',
  },
  {
    title: 'Contact',
    href: '/',
  },
  {
    title: 'Careers',
    href: '/',
  },
];

const programItems = [
  {
    title: 'TikTok for Good',
    href: '/',
  },
  {
    title: 'Advertise',
    href: '/',
  },
  {
    title: 'TikTok LIVE Creator Networks',
    href: '/',
  },
  {
    title: 'Developers',
    href: '/',
  },
  {
    title: 'Transparency',
    href: '/',
  },
  {
    title: 'TikTok Rewards',
    href: '/',
  },
  {
    title: 'TikTok Embeds',
    href: '/',
  },
];

const policiesItems = [
  {
    title: 'Help',
    href: '/',
  },
  {
    title: 'Safely',
    href: '/',
  },
  {
    title: 'Terms',
    href: '/',
  },
  {
    title: 'Privacy Policy',
    href: '/',
  },
  {
    title: 'Privacy Center',
    href: '/',
  },
  {
    title: 'Creator Portal',
    href: '/',
  },
  {
    title: 'Community Guidelines',
    href: '/',
  },
];

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer-banner')}>
        <a href="https://www.w3schools.com" className={cx('banner-link')}>
          <Image
            src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
            alt="banner"
            className={cx('banner-img')}
          />
          <h4 className={cx('banner-title')}>
            Create TikTok effects, get a reward
          </h4>
        </a>
      </div>
      <FooterInfo title="Company" items={companyItems} />
      <FooterInfo title="Program" items={programItems} />
      <FooterInfo title="Terms & Policies" items={policiesItems} />
      <span className={cx('copyright')}>&copy; 2024 TikTok</span>
    </footer>
  );
}

export default Footer;
