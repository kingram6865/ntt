import axios from "axios";

let apiUrl;

const apiUrls = {
  production: 'https://archimedes.sdlapps.net/api',
  development: 'http://apollo:3025/ntt'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

const api = axios.create({
  baseURL: apiUrl
});

export default api;