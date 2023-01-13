import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import { fetchSingleArticle } from '../api';
import BadPath from './BadPath';

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [badPath, setBadPath] = useState(false);
  const { article_id } = useParams();
  const { title, body, topic, author, created_at, votes, comment_count } =
    article;
  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setBadPath(true);
      });
  }, [article_id]);

  const dateObject = new Date(created_at);
  const readableDate = dateObject.toLocaleString('en-gb');

  if (isLoading) return <div>Loading ...</div>;
  if (badPath) return <BadPath />;
  return (
    <div id="article-and-comments-container">
      <article style={articleContainerStyle} id="article-container">
        <h2 id="article-title">{title}</h2>
        <div id="article-body">{body}</div>
        <div style={articleDetailsStyle} id="post-details-container">
          <div id="article-topic">{topic}</div>
          <div id="article-author">Author: {author}</div>
          <div id="article-date">Posted: {readableDate}</div>
        </div>
      </article>
      <Comments />
    </div>
  );
}

const articleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  margin: 'auto',
  marginTop: '1em',
  border: '1px black solid',
  borderRadius: '15px',
};

const articleDetailsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '14px',
  marginTop: '2em',
  marginBottom: '1em',
};
