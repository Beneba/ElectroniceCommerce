import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import Productinfo from './pages/Productinfo';
import RegisterPage from './pages/RegisterPage';

import CartPage from './pages/CartPage';
import './stylesheets/Layout.css';
import './stylesheets/product.css';
import './stylesheets/authentication.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="App">
      <ToastContainer />
      
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={ <ProtectedRoutes> <Homepage /> </ProtectedRoutes>} /> 
        <Route path='/productinfo/:productid' exact element={  <ProtectedRoutes> <Productinfo /> </ProtectedRoutes>} />
        <Route path='/cart' exact element={  <ProtectedRoutes> <CartPage /> </ProtectedRoutes>}  />

        <Route path='/Login' exact element={ <LoginPage /> } />
        <Route path='/Register' exact element={ <RegisterPage /> } />

      </Routes>
      </BrowserRouter>

    </div>
  );
}

 
export default App;

export const ProtectedRoutes =({children}) =>{
  if(localStorage.getItem('currentUser')){
    return children
  }
  else{
     return  <Navigate to ='login' />
  }
};