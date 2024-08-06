import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';
import PropTypes from 'prop-types';

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.defaultImage,
      ...props
    },
    ref,
  ) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => setFallback(customFallback);

    return (
      <img
        ref={ref}
        className={classNames(styles.wrapper, className)}
        src={src || fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  },
);

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
