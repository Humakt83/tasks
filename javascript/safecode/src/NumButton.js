import './NumButton.scss';
import { useDispatch } from 'react-redux';
import {addNumber} from './store';

function NumButton(props) {
  const dispatch = useDispatch();
  const number = props.number;
  return (
    <button id={'key-' + number} onClick={() => dispatch(addNumber(Number(number)))}>
      {number}
    </button>
  );
}

export default NumButton;
