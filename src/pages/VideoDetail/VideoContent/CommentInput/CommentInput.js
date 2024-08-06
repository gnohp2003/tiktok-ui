import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './CommentInput.module.scss';
import { VideoContentContext } from '../VideoContent';
import * as commentService from '~/services/commentService';
import { toast } from 'sonner';
import { useAuth } from '~/context';

const cx = classNames.bind(styles);

const LIMIT_LETTER = 150;

function CommentInput() {
  const { isAuth } = useAuth();

  const { data: parentData, setComment } = useContext(VideoContentContext);
  const [countLetter, setCountLetter] = useState(0);

  const textareaRef = useRef();
  const countLetterRef = useRef();

  useEffect(() => {
    const textarea = textareaRef.current;
    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener('input', adjustHeight);

    return () => {
      textarea.removeEventListener('input', adjustHeight);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMIT_LETTER) {
      setCountLetter(Number(value.length));
    } else {
      e.target.value = value.substring(0, LIMIT_LETTER);
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const handleSendComment = () => {
    if (countLetter === 0) return;

    const postComment = async () => {
      const data = { comment: textareaRef.current.value };
      const response = await commentService.createComment(
        parentData?.uuid,
        data,
      );

      if (response) {
        setComment(response);
      } else {
        toast('Comment has been failed!');
      }
    };
    postComment();
    textareaRef.current.value = '';
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('input-container')}>
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder="Add comment..."
            className={cx('input-comment')}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handlePressEnter(e)}
            disabled={!isAuth}
          />
          {countLetter >= 60 && (
            <div
              ref={countLetterRef}
              className={cx('count-letter', {
                'limit-letter': countLetter === LIMIT_LETTER,
              })}
            >
              {countLetter}/{LIMIT_LETTER}
            </div>
          )}
        </div>
        <div
          className={cx('send-btn', { active: countLetter !== 0 })}
          onClick={handleSendComment}
        >
          Post
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
