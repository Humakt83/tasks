
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Stations from './components/Stations';
import './App.scss';
import StationDetails from './components/details/StationDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Stations />
        </Route>
        <Route path="/station/:id">
          <StationDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
