import './App.css'
import Applayout from './Applayout'
import AddProduct from './components/AddProduct'
import Test from './components/Test'
import { useUser } from './context/users/useUser'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated !== null ? <Outlet /> : <Navigate to="/login" replace />;
};
const AdminProtected = ({admin}) => {
  return admin ;
}
function App() {

  const {username} = useUser();

  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={username} />}>
            <Route element={<Applayout/>}>
                <Route path='/test' element={<Test/>}/>
                <Route path='/' element={<Landing/>}/>
                <Route path='/admin/new' element={<AddProduct />} />
            </Route>
          </Route>
          <Route  path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
