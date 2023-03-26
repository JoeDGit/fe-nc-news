import React, { useContext, useState } from 'react';
import { deleteComment } from '../util/api';
import { UserContext } from '../contexts/User.context';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import moment from 'moment';

export default function CommentCard({ comment, setComments }) {
  const { author, body, comment_id, created_at, votes } = comment;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const { user } = useContext(UserContext);

  const dateObject = moment(created_at);
  const readableDate = dateObject.fromNow();

  const handleDelete = () => {
    setDeleteInProgress(true);

    deleteComment(comment_id)
      .then(() => {
        setDeleteInProgress(false);
        deleteSuccess(comment_id);
      })
      .catch(() => {
        setDeleteInProgress(false);
        deleteFailStateReset();
      });
  };

  const handleUpVote = () => {};
  const handleDownVote = () => {};

  const deleteSuccess = (comment_id) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.comment_id === comment_id) {
          const commentCopy = { ...comment };
          commentCopy.body = 'COMMENT DELETED';
          return commentCopy;
        }
        return comment;
      });
    });
    const timer = setTimeout(() => {
      setComments((prev) => {
        return prev.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
      });
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  };

  const deleteFailStateReset = () => {
    setFailedDelete(true);
    const timer = setTimeout(() => {
      setFailedDelete(false);
      setConfirmDelete(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div
      className="flex w-full border border-slate-600 mb-1"
      id="comment-and-vote-container"
    >
      <div className="flex flex-col mt-2 ml-2" id="article-votes">
        <div onClick={() => handleUpVote()} id="up-vote">
          <BiUpvote className="active:translate-y-0.5" />
        </div>

        <div onClick={() => handleDownVote()} id="down-vote">
          <BiDownvote className="active:-translate-y-0.5" />
        </div>
      </div>

      <div
        className="flex flex-col p-3 w-full text-left"
        id="comment-container"
      >
        <div
          className="flex text-xs w-full justify-start mb-2"
          id="author-and-date-container"
        >
          <div id="author-username">
            <span className="text-primary">{author} </span>
            <span className="font-bold">{votes} votes</span> {readableDate}
          </div>
          {author === user.username && !confirmDelete && !failedDelete ? (
            <button
              className="bg-primary ml-4 px-2 py-[0px] rounded-md text-xs"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          ) : null}
          {confirmDelete && !failedDelete ? (
            <div className="ml-4">
              Are you sure? <button onClick={handleDelete}>Yes</button> /{' '}
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          ) : null}
          {failedDelete ? (
            <div className="ml-4" style={{ color: 'red' }}>
              Something went wrong, please try again
            </div>
          ) : null}
        </div>
        <div className="" id="comment-body">
          {body}
          {deleteInProgress ? (
            <div style={{ color: 'red' }}>Deleting...</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
