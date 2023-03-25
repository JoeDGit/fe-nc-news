import React, { useContext, useState } from 'react';
import { postNewComment } from '../util/api';
import { UserContext } from '../contexts/User.context';

export default function NewCommentInput({ article_id, setComments }) {
  const [newCommentBody, setNewCommentBody] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidComment, setInvalidComment] = useState(false);

  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    setInvalidComment(false);
    e.preventDefault();

    if (
      newCommentBody.length < 5 ||
      !/^[\w\s',."@;:!?/\\#~]*$/gm.test(newCommentBody) ||
      newCommentBody.split('').every((char) => char === ' ')
    ) {
      setInvalidComment(true);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    postNewComment(article_id, newCommentBody, user.username)
      .then((res) => {
        const newComment = {
          body: res.commentBody,
          author: 'cooljmessy',
          votes: 0,
          created_at: Date.now(),
          comment_id: res.commentId,
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
    <form
      className="flex flex-col w-[60%] m-auto justify-center items-center mb-4 gap-4"
      onSubmit={handleSubmit}
    >
      {invalidComment ? (
        <div style={{ color: 'red' }}>
          Please enter a comment greater than 5 characters, containing letters
          or numbers
        </div>
      ) : null}
      {isError ? (
        <div style={{ color: 'red' }}>
          Something went wrong, please try again
        </div>
      ) : null}
      <label htmlFor="comment-input">Post a comment:</label>
      <textarea
        onChange={handleChange}
        required
        className="textarea textarea-primary w-1/2"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
