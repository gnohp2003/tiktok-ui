import classNames from 'classnames/bind';

import styles from './Posts.module.scss';
import PostItem from './PostItem';
import * as videoServices from '~/services/videoService';
import { useEffect, useState } from 'react';
import PreviewPostedVideo from './PreviewPostedVideo';

const cx = classNames.bind(styles);
const { uid } = JSON.parse(localStorage.getItem('site')) || '';

function Posts() {
  const [postedVideos, setPostedVideos] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    const fetchPostedVideos = async () => {
      const response = await videoServices.userVideos(uid);
      setPostedVideos(response);
    };

    fetchPostedVideos();
  }, []);

  const handleTogglePreview = (toggle) => {
    setShowVideo(toggle);
  };

  const handleChoosePreviewVideo = (videoSource) => {
    setPreviewVideo(videoSource);
  };

  return (
    <div className={cx('wrapper')}>
      {/* preview posted video */}
      <PreviewPostedVideo
        videoSource={previewVideo}
        togglePreview={showVideo}
        handleTogglePreview={handleTogglePreview}
      />
      <div className={cx('container')}>
        <div className={cx('title')}>Manage your posts</div>
        <div className={cx('video-lists')}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th className={cx('table-field')} colSpan={1}>
                  <span className={cx('field-text')}>Posts</span>
                </th>
                <th className={cx('table-field')} colSpan={1}>
                  <span className={cx('field-text')}>Actions</span>
                </th>
                <th className={cx('table-field')} colSpan={1}>
                  <span className={cx('field-text')}>Status</span>
                </th>
                <th className={cx('table-field')} colSpan={1}>
                  <span className={cx('field-text')}>Privacy</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {postedVideos && postedVideos.length !== 0 ? (
                postedVideos.map((post) => (
                  <PostItem
                    key={post.uuid}
                    data={post}
                    handleTogglePreview={handleTogglePreview}
                    handleChoosePreviewVideo={handleChoosePreviewVideo}
                  />
                ))
              ) : (
                <tr className={cx('no-posts-container')}>
                  <td colSpan={4}>
                    <div className={cx('no-posts')}>No results found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Posts;
