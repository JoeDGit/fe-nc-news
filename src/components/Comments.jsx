import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleComments } from '../api';
import CommentCard from './CommentCard';
import NewCommentInput from './NewCommentInput';

export default function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetchArticleComments(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <div>Loading ... </div>;
  return (
    <div>
      <h3>Comments</h3>
      <NewCommentInput article_id={article_id} setComments={setComments} />
      {comments
        .sort((a, b) =>
          a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0
        )
        .map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComments={setComments}
            />
          );
        })}
    </div>
  );
}
