
import './App.css';
import dashboard from './components/dashboard';
import Login from './components/login'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Login>
      </Login>
      <Router>
      <Route exact path="/dashboard" component={dashboard} />
    </Router>
    </div>
    
  );
}

export default App;
