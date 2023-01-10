import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleComments } from '../api';
import CommentCard from './CommentCard';

export default function Comments() {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <div>Loading ... </div>;
  return (
    <div>
      <h3>Comments</h3>
      {comments
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
    </div>
  );
}
