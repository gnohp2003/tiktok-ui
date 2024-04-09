import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

function Image(
  {
    src,
    alt,
    className,
    fallback: customFallback = images.defaultImage,
    ...props
  },
  ref,
) {
  const [fallback, setFallback] = useState('');

  const handleError = () => setFallback(customFallback);

  return (
    <img
      ref={ref}
      className={classNames(styles.wrapper, className)}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
}

export default forwardRef(Image);
