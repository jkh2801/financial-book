import './App.css';
import Nav from './components/Nav'

import { BrowserRouter as Router, Route} from "react-router-dom";
import Calendar from './components/Calendar'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Route path="/calendar" component = {Calendar} ></Route>
      </Router>
    </div>
  );
}

export default App;
