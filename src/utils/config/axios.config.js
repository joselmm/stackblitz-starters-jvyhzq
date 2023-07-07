import axios from 'axios';

const RequestApi = axios.create({
  baseURL: 'https://api.chucknorris.io/jokes',
  headers: { 'Content-Type': 'application/json' },
});

export default RequestApi;
