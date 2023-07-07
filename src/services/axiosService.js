import RequestApi from '../utils/config/axios.config.js';

const getRamdomJoke = () => {
  return RequestApi.get('/random');
};

export { getRamdomJoke };
