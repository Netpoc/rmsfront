import axios from 'axios';

// Create an Axios instance with default options
const apiClient = axios.create({
  baseURL: 'https://flespi.io',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `FlespiToken WZ2ucUAAx1DXYJD45BwCylRjgUooHyT18KPBmjDc76eJJGUuot6PSVrkotHGIphD`
  }
});

export default {
  getFlespiData() {
    return apiClient.get('/gw/calcs/1704940/devices/5848395/intervals/20');
  },
  getRefillData() {
    return apiClient.get('https://flespi.io/gw/calcs/1704949/devices/5848395/intervals/all');
  }
};
