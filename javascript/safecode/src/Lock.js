import './Lock.scss';
import { useSelector } from 'react-redux';
import { locked } from './store';

function Lock() {

  const lock = useSelector(locked);

  return (
    <div id="lock">
      {lock ? '🔒' : '🔓'}
    </div>
  );
}

export default Lock;
