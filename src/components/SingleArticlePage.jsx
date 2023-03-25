import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import { fetchSingleArticle } from '../util/api';
import BadPath from './BadPath';
import SingleArticle from './SingleArticle';
import moment from 'moment';

export default function SingleArticlePage() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [badPath, setBadPath] = useState(false);
  const { article_id } = useParams();
  const { title, body, topic, author, created_at } = article;
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

  const dateObject = moment(created_at);
  const readableDate = dateObject.fromNow();

  if (isLoading) return <div>Loading ...</div>;
  if (badPath) return <BadPath />;
  return (
    <div id="article-and-comments-container">
      <SingleArticle
        articleTopic={topic}
        articleAuthor={author}
        articleTitle={title}
        articleBody={body}
        readableDate={readableDate}
      />
      <Comments />
    </div>
  );
}
