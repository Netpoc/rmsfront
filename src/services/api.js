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
    return apiClient.get('/gw/calcs/1704940/devices/5848395/intervals/21');
  },
  getRefillData() {
    return apiClient.get('https://flespi.io/gw/calcs/1704949/devices/5848395/intervals/all');
  },
  getAllDevices() {
    return apiClient.get('https://flespi.io/gw/devices/all')
  },
  getMessages() {
    return apiClient.get('https://flespi.io/gw/devices/5848395/messages?data={"fields":"escort.lls.value.2,din.1,din.2,din.3,timestamp"}')
  }
};
