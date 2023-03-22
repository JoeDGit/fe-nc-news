import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { patchArticleVotes } from '../util/api';
import { BiUpvote, BiDownvote, BiCommentDetail } from 'react-icons/bi';
import moment from 'moment/moment';

export default function ArticleCard({ article, setArticles }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const { article_id, title, topic, author, created_at, votes, comment_count } =
    article;
  const dateObject = moment(created_at);
  const readableDate = dateObject.fromNow();

  const handleError = () => {
    setIsError(true);
    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage(null);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleUpVote = () => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article.article_id === article_id) {
          return { ...article, votes: article.votes + 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article_id, 'up').catch((err) => {
      setArticles((currentArticles) => {
        return currentArticles.map((article) => {
          if (article.article_id === article_id) {
            return { ...article, votes: article.votes - 1 };
          }
          return article;
        });
      });
      setErrorMessage('Something went wrong, please try again');
      handleError();
    });
  };

  const handleDownVote = () => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article.article_id === article_id) {
          return { ...article, votes: article.votes - 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article_id, 'down').catch((err) => {
      setArticles((currentArticles) => {
        return currentArticles.map((article) => {
          if (article.article_id === article_id) {
            return { ...article, votes: article.votes + 1 };
          }
          return article;
        });
      });
      setErrorMessage('Something went wrong, please try again');
      handleError();
    });
  };

  return (
    <div
      className="flex mx-auto justify-center w-full mb-1 pb-1 pt-2 border-[1px] border-slate-500 rounded "
      id="article-and-votes-container"
    >
      <div className="flex flex-col mt-1 ml-4" id="article-votes">
        <div onClick={() => handleUpVote()} id="up-vote">
          <BiUpvote />
        </div>
        <div className="text-orange-600" id="vote-count">
          {votes}
        </div>
        <div onClick={() => handleDownVote()} id="down-vote">
          <BiDownvote />
        </div>
      </div>

      <div
        className="flex flex-col mb-1   w-full focus:bg-black text-ellipsis whitespace-nowrap overflow-hidden"
        id="article-container"
      >
        <Link to={`/articles/${article_id}`}>
          <div
            id="article-title"
            className="text-left md:text-lg ml-4 text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {title}
          </div>
        </Link>
        <div className="flex text-[11px] justify-start ml-3 mb-1 [&>*]:mx-2">
          <div id="article-date-and-author">
            Submitted {readableDate} by {author}
          </div>
        </div>

        <div
          className="flex text-[11px] justify-start ml-4 [&>*]:mx-2 "
          id="post-details-container"
        >
          <div className="flex gap-1 items-center" id="article-comment-count">
            <p>{comment_count}</p>
            <div>
              <BiCommentDetail size={12} />
            </div>
          </div>
          <div id="post-topic">posted in {topic}</div>
        </div>

        {isError ? (
          <div className="text-orange-500 text-sm md:text-base">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}
