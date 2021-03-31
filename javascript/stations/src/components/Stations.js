import {useState, useEffect} from 'react';
import './Stations.scss';
import {getStations} from '../api/stations-api';
import Station from './Station';

function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const loadStations = async () => {
      const response = await getStations();
      setStations(response.data);
    };
    loadStations();
  }, []);

  return (
    <div className="stations">
      <h1>Your stations</h1>      
      <div className="stations_list">
        {stations.map((station, index) => {
          return <Station key={index} station={station} />
        })}
      </div>
    </div>
  );
}

export default Stations;