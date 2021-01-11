import './Lock.scss';
import { useSelector } from 'react-redux';
import { numbers, CORRECT_CODE } from './store';

function NumbersDisplay() {

  const numbersDisplay = useSelector(numbers);

  return (
    <div>
      <p>Correct code is {CORRECT_CODE}.</p>
      <input type="text" disabled value={numbersDisplay} />
    </div>
  );
}

export default NumbersDisplay;
