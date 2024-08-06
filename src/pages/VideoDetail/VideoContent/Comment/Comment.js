import classNames from 'classnames/bind';
import { toast } from 'sonner';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './Comment.module.scss';
import Header from './Header/Header';
import CommentItem from './CommentItem/CommentItem';
import * as commentServices from '~/services/commentService';
import { VideoContentContext } from '../VideoContent';
import { useAuth, useStore } from '~/context';

const cx = classNames.bind(styles);

function Comment() {
  const { isAuth } = useAuth();
  const { handleDisplayForm } = useStore();
  const { data, comment } = useContext(VideoContentContext);
  const [commentLists, setCommentLists] = useState(null);
  const [nextCommentLists, setNextCommentLists] = useState(null);

  const contentBoxRef = useRef();

  useEffect(() => {
    if (isAuth) {
      if (comment) {
        contentBoxRef.current.scrollTop = 0;
      }

      if (data || comment) {
        const commentFetch = async () => {
          const response = await commentServices.getCommentList(data?.uuid);
          if (response) {
            setCommentLists(response.data);
            if (response.meta.pagination.links.next) {
              const next = response.meta.pagination.links.next;
              const startIndex = next.indexOf('videos');
              const newNext = next.substring(startIndex, next.length);
              setNextCommentLists(newNext);
            }
          } else {
            toast('Failed in loading video comments. Please try again!');
          }
        };
        commentFetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, comment]);

  const handleClickCommentPopup = (commentId, removeItem = () => {}) => {
    const deleteComment = async () => {
      const response = await commentServices.deleteComment(commentId);
      if (response) {
        const commentFetch = async () => {
          const response = await commentServices.getCommentList(data?.uuid);
          if (response) {
            if (response.data.length !== 0) {
              removeItem();
            } else {
              setCommentLists(response.data);
            }
          }
        };

        toast('Comment has been deleted');
        commentFetch();
      } else {
        toast('Deleting comment has been failed');
      }
    };

    deleteComment();
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = contentBoxRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (nextCommentLists) {
        const fetchNextCommentLists = async () => {
          const response = await commentServices.getCommentList(
            data?.uuid,
            nextCommentLists,
          );

          if (response) {
            setCommentLists((prev) => [...prev, ...response.data]);

            if (response.meta.pagination.links.next) {
              const next = response.meta.pagination.links.next;
              const startIndex = next.indexOf('videos');
              const newNext = next.substring(startIndex, next.length);
              setNextCommentLists(newNext);

              return;
            }

            setNextCommentLists(null);
          } else {
            toast('Failed in loading video comments. Please try again!');
          }
        };

        fetchNextCommentLists();
      }
    }
  };

  const handleClickLogin = () => {
    handleDisplayForm();
  };

  return (
    <div ref={contentBoxRef} className={cx('wrapper')} onScroll={handleScroll}>
      <Header />
      <div className={cx('separate')}></div>
      {commentLists?.length !== 0 ? (
        commentLists?.map((comment) => (
          <CommentItem
            key={comment.id}
            data={comment}
            handleClickPopup={handleClickCommentPopup}
          />
        ))
      ) : (
        <div className={cx('no-comment')}>Be the first to comment!</div>
      )}
      {!isAuth && (
        <div className={cx('login-announce')}>
          <div className={cx('login-announce-title')}>
            Please log in to use this feature!{' '}
            <span onClick={handleClickLogin} className={cx('login-link')}>
              Log in
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
