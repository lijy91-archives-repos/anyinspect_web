import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://anyinspect-api.leanflutter.com',
});

export default httpClient;
