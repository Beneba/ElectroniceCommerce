import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import Productinfo from './pages/Productinfo';
import CartPage from './pages/CartPage';
import './stylesheets/Layout.css';
import './stylesheets/product.css';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={ <Homepage /> } />
        <Route path='/Login' exact element={ <LoginPage /> } />
        <Route path='/productinfo/:productid' exact element={ <Productinfo /> } />
        <Route path='/Cart' exact element={ <CartPage /> } />

      </Routes>
      </BrowserRouter>

    </div>
  );
}

 
export default App;
