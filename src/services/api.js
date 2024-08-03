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
    return apiClient.get('/gw/calcs/1704940/devices/5848395/intervals/all');
  },
  getRefillData() {
    return apiClient.get('/gw/calcs/1704949/devices/5848395/intervals/all');
  },
  getAllDevices() {
    return apiClient.get('/gw/devices/all')
  },
  getMessages() {
    return apiClient.get('/gw/devices/5848395/messages?data={"fields":"server.timestamp,escort.lls.value.2,din.1,din.2,din.3,timestamp,custom.param.306"}')
  },
  getLiveData() {
    return apiClient.get('https://flespi.io/gw/devices/5848395/telemetry/device.name,din.1,din.2,din.3,escort.lls.value.2');
  },
  getGenOnDurations() {
    return apiClient.get('/gw/calcs/1705560/devices/5848395/intervals/all')
  },
  getReport() {
    return apiClient.get('/gw/calcs/1705766/devices/5848395/intervals/all')
  }
  
};
