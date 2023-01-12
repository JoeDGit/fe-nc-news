import React, { useContext, useState } from 'react';
import { deleteComment } from '../api';
import { UserContext } from '../User';

export default function CommentCard({ comment, setComments }) {
  const { author, body, comment_id, created_at, votes } = comment;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const { user } = useContext(UserContext);

  const parsedDate = new Date(created_at);
  const readableDate = String(parsedDate).slice(0, 24);

  const handleDelete = () => {
    setDeleteInProgress(true);

    deleteComment(comment_id)
      .then(() => {
        setDeleteInProgress(false);
        deleteSuccess(comment_id);
      })
      .catch((err) => {
        console.log(err);
        setDeleteInProgress(false);
        deleteFailStateReset();
      });
  };

  const deleteSuccess = (comment_id) => {
    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.comment_id === comment_id) {
          const commentCopy = { ...comment };
          commentCopy.body = 'MESSAGE DELETED';
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
    <div style={commentAndVotesStyle} id="comment-and-vote-container">
      <div style={votesStyle} id="comment-votes">
        <div id="up-vote">↑</div>
        <div id="vote-count">{votes}</div>
        <div id="down-vote">↓</div>
      </div>
      <div style={commentContainerStyle} id="comment-container">
        <div id="comment-body">
          {body}{' '}
          {deleteInProgress ? (
            <div style={{ color: 'red' }}>Deleting...</div>
          ) : null}
        </div>
        <div style={authorDateStyle} id="author-and-date-container">
          <div id="author-username">
            Posted by: <span style={{ fontWeight: 'bold' }}>{author}</span>{' '}
          </div>
          <div>
            Posted on:{' '}
            <span style={{ fontWeight: 'bold' }}>{readableDate}</span>
          </div>
          {author === user.username && !confirmDelete && !failedDelete ? (
            <button onClick={() => setConfirmDelete(true)}>Delete</button>
          ) : null}
          {confirmDelete && !failedDelete ? (
            <div>
              Are you sure? <button onClick={handleDelete}>Yes</button> /{' '}
              <button onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          ) : null}
          {failedDelete ? (
            <div style={{ color: 'red' }}>
              Something went wrong, please try again
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const commentAndVotesStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60%',
  margin: 'auto',
  marginBottom: '1em',
};

const votesStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '15px',
  marginTop: '1em',
  marginRight: '1em',
};

const commentContainerStyle = {
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
  border: '1px black solid',
  borderRadius: '15px',
  padding: '1em',
};

const authorDateStyle = {
  display: 'flex',
  marginTop: '1em',
  fontSize: '12px',
  justifyContent: 'space-around',
};
