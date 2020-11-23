import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home'
import Calendar from './components/Calendar'
import Chart from './components/Chart'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component = {Home} ></Route>
        <Route path="/calendar" component = {Calendar} ></Route>
        <Route path="/chart" component = {Chart} ></Route>
        <Route path="/loginPage" component = {LoginPage} ></Route>
      </Router>
    </div>
  );
}

export default App;
