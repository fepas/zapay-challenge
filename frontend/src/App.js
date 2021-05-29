import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import SearchResult from './screens/SearchResult';
import Error from './screens/Error';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/debts/search" component={SearchResult} />
        <Route path="/404" component={Error} exact />
      </Switch>
    </div>
  );
}

export default App;
