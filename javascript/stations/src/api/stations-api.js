import axios from 'axios';

const getStations = async (prefix = '') => {
  return axios.get(prefix + 'res/stations.json');
};

export {getStations};