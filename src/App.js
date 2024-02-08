import './App.css';
import HomePage from './modules/common/homePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './modules/common/loginPage/Login';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/auth' element={<Login/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
