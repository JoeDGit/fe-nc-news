import React, { useState } from 'react';
import { postNewComment } from '../api';

export default function NewCommentInput({ article_id, setComments }) {
  const [newCommentBody, setNewCommentBody] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    setIsError(false);
    e.preventDefault();
    postNewComment(article_id, newCommentBody, 'cooljmessy')
      .then((res) => {
        const newComment = {
          body: res.comment,
          author: 'cooljmessy',
          votes: 0,
          created_at: Date.now(),
          comment_id: Date.now(),
        };
        setComments((currComments) => {
          return [newComment, ...currComments];
        });
        setIsLoading(false);
        handleCommentSubmit();
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const handleCommentSubmit = () => {
    setCommentSubmitted(true);
    const timer = setTimeout(() => {
      setCommentSubmitted(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleChange = (e) => {
    setNewCommentBody(e.target.value);
  };
  if (commentSubmitted) return <h4>Comment submitted!</h4>;
  if (isLoading) return <div>Posting your comment ...</div>;
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      {isError ? (
        <div style={{ color: 'red' }}>
          Something went wrong, please try again
        </div>
      ) : null}
      <label htmlFor="comment-input">Post a comment:</label>
      <textarea onChange={handleChange} required style={inputStyle}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

const inputStyle = {
  height: '6em',
  width: '30em',
  borderRadius: '15px',
  marginBottom: '1em',
  padding: '1em',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  margin: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1em',
  gap: '1em',
};
