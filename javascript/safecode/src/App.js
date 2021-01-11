import './App.scss';
import Lock from './Lock';
import NumButton from './NumButton';
import NumbersDisplay from './NumbersDisplay';

function App() {
  const numbers = [1,2,3,4,5,6,7,8,9,0]
    .map((v) => <NumButton number={v} key={'key-' + v}/>)
    .concat(<Lock key="lock"/>);
  return (
    <div className="App">
      <NumbersDisplay />
      <div className="numgrid">
        {numbers}
      </div>
    </div>
  );
}

export default App;
