import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { toast } from 'sonner';

import styles from './Posts.module.scss';
import Image from '~/components/Image';
import { BookMarkIconSolid, ShareIcon } from '~/components/Icons';
import { memo, useEffect, useRef, useState } from 'react';
import * as videoServices from '~/services/videoService';

const cx = classNames.bind(styles);

function PostItem({ data, handleTogglePreview, handleChoosePreviewVideo }) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacy, setPrivacy] = useState(null);
  const [videoTime, setVideoTime] = useState(null);

  const postItemRef = useRef();

  useEffect(() => {
    if (data?.viewable === 'public') {
      setPrivacy({ title: 'Everyone', value: 'public' });
    } else if (data?.viewable === 'private') {
      setPrivacy({ title: 'Only me', value: 'private' });
    } else {
      setPrivacy({ title: 'Friends', value: 'friends' });
    }

    // handle calculate number of times of video
    const videoElement = document.createElement('video');
    videoElement.src = data?.file_url;
    // let minute, second;

    // if (videoElement.duration >= 60) {
    //   minute = Math.trunc(videoElement.duration / 60);
    //   second = Math.ceil(videoElement.duration - minute * 60);
    // } else if (videoElement.duration < 60) {
    //   minute = 0;
    //   second = Math.ceil(videoElement.duration);
    // }
    console.log(videoElement.duration);
    // setVideoTime(`${minute}:${second}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrivacy = () => setShowPrivacy((prev) => !prev);

  const handleChangePrivacy = async (videoId, data) => {
    setPrivacy(data);
    setShowPrivacy(false);

    // update video privacy
    const formData = new FormData();
    formData.append('viewable', data.value);

    // call api
    const response = await videoServices.update(videoId, formData);
    response
      ? toast('Privacy setting has been updated')
      : toast('Failed in updating privacy');
  };

  const handleDeletePost = async (videoId) => {
    const response = await videoServices.deleteVideo(videoId);
    response
      ? toast('Video has been deleted')
      : toast('Failed in deleting video');

    // Hide post item immediately without reloading page
    postItemRef.current.style.opacity = '0';
    setTimeout(() => {
      postItemRef.current.remove();
    }, 400);
  };

  return (
    <tr ref={postItemRef} className={cx('post-item')}>
      <td className={cx('item-field')}>
        <div className={cx('posts-item-container')}>
          <div className={cx('video-container')}>
            <Image
              className={cx('video-thumb')}
              src={data?.thumb_url}
              alt=""
              onClick={() => {
                handleTogglePreview(true);
                handleChoosePreviewVideo(data?.file_url);
              }}
            />
            <div className={cx('action-layer')}></div>
            <div className={cx('video-time')}>{videoTime && videoTime}</div>
          </div>
          <div className={cx('video-info')}>
            <div className={cx('video-title')}>{data?.description}</div>
            <div className={cx('video-amounts')}>
              <div className={cx('amount-item')}>
                <svg
                  className={cx('icon-amount')}
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6rem"
                  height="1.6rem"
                >
                  <path d="M24 12.19c-4.36-4.78-11.05-4.84-15.29-.63a10.82 10.82 0 0 0 0 15.38l14.23 14.12a1.5 1.5 0 0 0 2.12 0l14.23-14.12a10.82 10.82 0 0 0 0-15.38c-4.24-4.2-10.93-4.15-15.29.63Z"></path>
                </svg>
                <span className={cx('numbers')}>{data?.likes_count}</span>
              </div>
              <div className={cx('amount-item')}>
                <svg
                  className={cx('icon-amount')}
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6rem"
                  height="1.6rem"
                >
                  <path d="M42 23.25c0 9.53-8.06 17.25-18 17.25-2.55 0-4.98-.51-7.18-1.43a46.95 46.95 0 0 1-6.26 2.78c-1.14.41-2.18-.9-1.68-2a18.45 18.45 0 0 0 1.55-5.27C7.67 31.55 6 27.58 6 23.25 6 13.72 14.06 6 24 6s18 7.72 18 17.25Zm-18 3A2.63 2.63 0 1 0 24 21a2.63 2.63 0 0 0 0 5.25Zm11.63-2.62a2.63 2.63 0 1 0-5.26 0 2.63 2.63 0 0 0 5.25 0ZM15 26.25A2.63 2.63 0 1 0 15 21a2.63 2.63 0 0 0 0 5.25Z"></path>
                </svg>
                <span className={cx('numbers')}>{data?.comments_count}</span>
              </div>
              <div className={cx('amount-item')}>
                <ShareIcon
                  className={cx('icon-amount')}
                  width="1.6rem"
                  height="1.6rem"
                />
                <span className={cx('numbers')}>{data?.shares_count}</span>
              </div>
              <div className={cx('amount-item')}>
                <BookMarkIconSolid
                  className={cx('icon-amount')}
                  width="1.6rem"
                  height="1.6rem"
                />
                <span className={cx('numbers')}>0</span>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className={cx('item-field')}>
        <div className={cx('action-container')}>
          <svg
            className={cx('action-icon', 'delete-btn')}
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="1.8rem"
            height="1.8rem"
            onClick={() => handleDeletePost(data?.id)}
          >
            <path d="M18 20a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V20ZM27 19a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V20a1 1 0 0 0-1-1h-2Z"></path>
            <path d="M32 8V6a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v2H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2.74l1.49 24.97c.19 3.18.28 4.77.96 5.98a6 6 0 0 0 2.6 2.44c1.25.61 2.84.61 6.02.61H29.2c3.18 0 4.77 0 6.02-.6a6 6 0 0 0 2.6-2.45c.68-1.21.77-2.8.96-5.98L40.27 12H43a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H32Zm-5-3a1 1 0 0 1 1 1v2h-8V6a1 1 0 0 1 1-1h6Zm-15.25 7h24.5l-1.47 24.73c-.1 1.66-.16 2.66-.27 3.41a5 5 0 0 1-.18.83v.01a2 2 0 0 1-.9.83l-.13.04c-.13.02-.34.06-.7.09-.75.06-1.76.06-3.41.06H18.8c-1.65 0-2.66 0-3.42-.06a4.99 4.99 0 0 1-.84-.14 2 2 0 0 1-.87-.82l-.02-.03-.04-.12a5 5 0 0 1-.13-.69c-.1-.75-.17-1.75-.27-3.4L11.75 12Z"></path>
          </svg>
        </div>
      </td>
      <td className={cx('item-field')}>
        <div className={cx('status-container')}>
          <div className={cx('video-status')}>
            <span className={cx('status-text')}>Posted</span>
          </div>
          <div className={cx('created-time')}>{data?.published_at}</div>
        </div>
      </td>
      <td className={cx('item-field')}>
        <div className={cx('privacy-container')}>
          <Tippy
            interactive
            visible={showPrivacy}
            arrow="false"
            placement="bottom-start"
            animation="shift-away"
            className={cx('tippy')}
            content={
              <ul className={cx('privacy-lists')}>
                <li
                  className={cx('privacy-item')}
                  onClick={() =>
                    handleChangePrivacy(data?.id, {
                      title: 'Everyone',
                      value: 'public',
                    })
                  }
                >
                  Everyone
                </li>
                <li
                  className={cx('privacy-item')}
                  onClick={() =>
                    handleChangePrivacy(data?.id, {
                      title: 'Only me',
                      value: 'private',
                    })
                  }
                >
                  Only me
                </li>
                <li
                  className={cx('privacy-item')}
                  onClick={() =>
                    handleChangePrivacy(data?.id, {
                      title: 'Friends',
                      value: 'friends',
                    })
                  }
                >
                  Friends
                </li>
              </ul>
            }
            onClickOutside={() => setShowPrivacy(false)}
          >
            <p className={cx('privacy-title')} onClick={handlePrivacy}>
              {privacy && privacy.title}
            </p>
          </Tippy>
        </div>
      </td>
    </tr>
  );
}

export default memo(PostItem);
