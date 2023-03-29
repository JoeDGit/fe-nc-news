import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User.context';
import { deleteArticle, patchArticleBody } from '../util/api';
import AuthorDeleteControls from './AuthorDeleteControls';
import AuthorEditControls from './AuthorEditControls';

export default function SingleArticle({
  articleTopic,
  articleAuthor,
  articleTitle,
  articleBody,
  readableDate,
  article_id,
  setArticles,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [updatedArticleBody, setUpdatedArticleBody] = useState(articleBody);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = divRef.current;
    setDivWidth(clientWidth);
    setDivHeight(clientHeight);
  }, []);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const isAuthor = user.username === articleAuthor;

  const handleEditClick = () => {
    setIsBeingEdited(true);
  };

  const handleCancelEdit = () => {
    setIsBeingEdited(false);
    setUpdatedArticleBody(articleBody);
  };

  const handleSaveEdit = () => {
    setIsBeingEdited(false);
    if (articleBody === updatedArticleBody) return;
    patchArticleBody(article_id, updatedArticleBody);
  };

  const handleDelete = () => {
    deleteArticle(article_id)
      .then(() => {
        setDeleteSuccess(true);
        setArticles((prev) =>
          prev.filter((article) => article.article_id !== Number(article_id))
        );
        setTimeout(() => navigate(`/`), 2000);
      })
      .catch((err) => {
        deleteFailStateReset();
        console.log(err);
      });
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

  if (deleteSuccess)
    return (
      <div className="text-2xl">
        Post deleted! Redirecting you to the homepage...
      </div>
    );
  return (
    <article
      className="flex flex-col items-start  border border-slate-600 p-4"
      id="article-container"
    >
      <h2
        className="text-xl underline underline-offset-8 mb-4 decoraton-primary"
        id="article-title"
      >
        {articleTitle}
      </h2>
      <div
        className="md:flex  mb-2 text-xs w-full md:text-left"
        id="post-details"
      >
        <div>
          Posted In {articleTopic} by{' '}
          <span className="text-primary">{articleAuthor}</span> {readableDate}
        </div>
        <div className="mt-2 md:mt-0">
          {isAuthor && (
            <AuthorDeleteControls
              failedDelete={failedDelete}
              confirmDelete={confirmDelete}
              handleDelete={handleDelete}
              setConfirmDelete={setConfirmDelete}
            />
          )}
        </div>
      </div>
      {isBeingEdited ? (
        <textarea
          className={` textarea md:text-left p-4 border rounded ${
            isBeingEdited ? 'border-primary' : 'border-slate-600'
          }`}
          id="article-body"
          style={{ width: divWidth, height: divHeight }}
          value={updatedArticleBody}
          onChange={(e) => setUpdatedArticleBody(e.target.value)}
        ></textarea>
      ) : (
        <div
          ref={divRef}
          className={`md:text-left p-4 border rounded `}
          id="article-body"
        >
          {updatedArticleBody}
        </div>
      )}

      {isAuthor && (
        <AuthorEditControls
          isBeingEdited={isBeingEdited}
          handleEditClick={handleEditClick}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </article>
  );
}
