import { useState } from 'react'

import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import ProductsContainer from './components/Layout/ProductsContainer'
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <ProductsContainer />
      </main>
    </CartProvider>
  )
}

export default App
