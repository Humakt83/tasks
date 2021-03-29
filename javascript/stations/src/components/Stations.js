import './Stations.scss';
import {STATIONS} from '../api/stations-api';
import { useQuery } from '@apollo/client';

function Stations() {
  const { loading, error, data } = useQuery(STATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="stations">
      <h1>Your stations</h1>      
      <ul>
        {data.stations.map((station, index) => {
          return <li key={index}>{station.name}</li>
        })}
      </ul>
    </div>
  );
}

export default Stations;