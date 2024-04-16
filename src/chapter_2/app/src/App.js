import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import Header from './header'
import Products from './products'
import SignUp from './signup'
import SignIn from './signin'
import Product from './product'
import Cart from './cart'
import MyOrders from './my-orders'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function App() {
  let location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch({type: 'CLEAR_MESSAGE'})
  }, [dispatch, location])
  return (
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
  )
}

export default App
