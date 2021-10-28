import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://anyinspect-api.thecode.me',
});

export default httpClient;
