import {create} from 'axios';

const instance = create({
  baseURL: 'http://localhost:3001'
});

export default instance;
