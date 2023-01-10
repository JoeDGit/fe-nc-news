import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-site-backend.onrender.com/api/',
});

export const fetchAllArticles = () => {
  return newsApi.get('articles').then((res) => {
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
