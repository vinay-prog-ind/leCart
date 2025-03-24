import './App.css'
import Login from './pages/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
function App() {

  

  return (
    <>
      <Router>
        <Routes>
          <Route>
            
          </Route>
          <Route  path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
