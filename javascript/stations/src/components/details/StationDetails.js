import './StationDetails.scss';

import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getStations} from '../../api/stations-api';
import Arrow from './Arrow';

function StationDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [station, setStation] = useState({name: ''});

  useEffect(() => {
    const loadStations = async () => {
      const response = await getStations('../');
      setStation(response.data.find(st => st.station_ID === Number.parseInt(id)));
    };
    loadStations();
  }, [id]);

  const details = Object.entries(station).filter(val => val[0] !== 'name');

  return (
    <div className="details__container">      
      <div className="details__header">
        <div className="back" onClick={() => history.push('/')}>
          <Arrow />
        </div>
        <h1>{station.name}</h1>
      </div>
      <div className="details">
        {details.map((val, index) => {
          return (
            <div className="detail__item" key={`detail-${index}`}>
              <span className="label">{val[0]}</span>
              <span className="value">{val[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default StationDetails;