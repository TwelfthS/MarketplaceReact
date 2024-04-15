import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './header'
import Products from './products'
import SignUp from './signup'
import SignIn from './signin'
import Product from './product'
import Cart from './cart'
import MyOrders from './my-orders'

function App() {
  return (
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/products/:itemId' element={<Product />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-orders' element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
