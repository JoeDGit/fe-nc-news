import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-site-backend.onrender.com/api/',
});

export const fetchAllArticles = (topic, sort_by, order) => {
  return newsApi
    .get('articles', { params: { topic, sort_by, order } })
    .then((res) => {
      return res.data;
    });
};
export const fetchSingleArticle = (id) => {
  return newsApi.get(`articles/${id}`).then((res) => {
    return res.data;
  });
};

export const fetchArticleComments = (id) => {
  return newsApi.get(`articles/${id}/comments`).then((res) => {
    return res.data;
  });
};

export const patchArticleVotes = (id, voteDirection) => {
  const patchBody =
    voteDirection === 'up' ? { inc_votes: 1 } : { inc_votes: -1 };
  return newsApi.patch(`/articles/${id}`, patchBody).then((res) => {
    return res.data;
  });
};

export const postNewComment = (id, comment, username) => {
  const postBody = {
    body: comment,
    username,
  };

  return newsApi.post(`articles/${id}/comments`, postBody).then((res) => {
    return res.data;
  });
};

export const getArticleTopics = () => {
  return newsApi.get('topics').then((res) => {
    return res.data;
  });
};
