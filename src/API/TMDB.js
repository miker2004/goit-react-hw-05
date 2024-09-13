import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5b2561cb57ffa8e6a9098e26cf7f9cbf'; 


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, 
  }
});

export const fetchMovie = async (name) => {
  const resp = await axiosInstance.get(`/search/movie`, {
    params: {
      query: name,
      language: 'en-US',
      include_adult: false,
      page: 1
    }
  });
  return resp.data.results;
};

export const fetchTrending = async () => {
  const resp = await axiosInstance.get('/trending/movie/week');
  return resp.data.results;
};

export const fetchDetails = async (id) => {
  const resp = await axiosInstance.get(`/movie/${id}`);
  return resp.data;
};

export const fetchCredits = async (id) => {
  const resp = await axiosInstance.get(`/movie/${id}/credits`);
  return resp.data;
};

export const fetchReviews = async (id) => {
  const resp = await axiosInstance.get(`/movie/${id}/reviews`);
  return resp.data.results;
};
