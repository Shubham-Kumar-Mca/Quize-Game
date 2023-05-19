import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Quize from './pages/quize/Quize';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/Result';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quize' element={<Quize />} />
        <Route path='/result'  element = {<Result />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;