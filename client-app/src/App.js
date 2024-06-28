import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Front from '../src/UserAuth/Front.js'
import Discuss from '../src/Discuss/message.js'

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Front/>} />
        <Route path='/discuss' element={<Discuss/>} />
          
        </Routes>
      </Router>

    </>
  );
}

export default App;
