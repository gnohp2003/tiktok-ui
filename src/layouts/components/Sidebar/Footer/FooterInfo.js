import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function FooterInfo({ title, items = [] }) {
  return (
    <>
      <h4 className={cx('info-title')}>{title}</h4>
      <div className={cx('info-items')}>
        {items.map((item, index) => (
          <a className={cx('info-link')} key={index} href={item.href}>
            {item.title}
          </a>
        ))}
      </div>
    </>
  );
}

export default FooterInfo;
