import './Station.scss';
import Status from './Status';
import {useHistory} from 'react-router-dom';

function Station(props) {
  const history = useHistory();

  const station = props.station;

  return (
    <div className="station" onClick={() => history.push(`/station/${station.station_ID}`)}>
      <p>{station.name}</p>
      <Status available={station.available}/>
    </div>
  );
}

export default Station;