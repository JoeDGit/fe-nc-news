import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import { fetchSingleArticle } from '../util/api';
import BadPath from './BadPath';
import SingleArticle from './SingleArticle';
import moment from 'moment';
import Sidebar from '../components/Sidebar';

export default function SingleArticlePage({ setArticles }) {
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
    <div className="flex">
      <section
        className="ml-4 mr-4 md:mr-0 md:w-[70vw]"
        id="flex article-and-comments-container"
      >
        <SingleArticle
          articleTopic={topic}
          articleAuthor={author}
          articleTitle={title}
          articleBody={body}
          readableDate={readableDate}
          article_id={article_id}
          setArticles={setArticles}
        />
        <Comments />
      </section>

      <Sidebar />
    </div>
  );
}
