import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const VideoContentContext = createContext();

function VideoContent({ data }) {
  // comment data when user post a comment
  const [comment, setComment] = useState(null);

  const value = {
    data,
    comment,
    setComment,
  };

  return (
    <VideoContentContext.Provider value={value}>
      <div className={cx('wrapper')}>
        <Comment />
        <CommentInput />
      </div>
    </VideoContentContext.Provider>
  );
}

export default VideoContent;
