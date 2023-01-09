import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-site-backend.onrender.com/api/',
});

export const fetchAllArticles = () => {
  return newsApi.get('articles').then((res) => {
    return res.data;
  });
};
