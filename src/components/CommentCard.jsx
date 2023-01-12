import React, { useContext, useState } from 'react';
import { deleteComment } from '../api';
import { UserContext } from '../User';

export default function CommentCard({ comment, setComments }) {
  const { author, body, comment_id, created_at, votes } = comment;

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { user } = useContext(UserContext);

  const parsedDate = new Date(created_at);
  const readableDate = String(parsedDate).slice(0, 24);

  const handleDelete = () => {
    setComments((prevComments) => {
      return prevComments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    deleteComment(comment_id).catch(() => {
      setComments((prevComments) => {
        return [...prevComments, comment];
      });
    });
  };

  return (
    <div style={commentAndVotesStyle} id="comment-and-vote-container">
      <div style={votesStyle} id="comment-votes">
        <div id="up-vote">↑</div>
        <div id="vote-count">{votes}</div>
        <div id="down-vote">↓</div>
      </div>
      <div style={commentContainerStyle} id="comment-container">
        <div id="comment-body">{body}</div>
        <div style={authorDateStyle} id="author-and-date-container">
          <div id="author-username">
            Posted by: <span style={{ fontWeight: 'bold' }}>{author}</span>{' '}
          </div>
          <div>
            Posted on:{' '}
            <span style={{ fontWeight: 'bold' }}>{readableDate}</span>
          </div>
          {author === user.username && !confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)}>Delete</button>
          ) : null}
          {confirmDelete ? (
            <div>
              Are you sure? <button onClick={handleDelete}>Yes</button> /{' '}
              <button onClick={() => setConfirmDelete(false)}>No</button>
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
