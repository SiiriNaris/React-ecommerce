import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CloseBtn from '../Products/Buttons/CloseBtn'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import CheckOut from './checkOut'

const Cart = (props) => {
  const [checkOutIsShown, setCheckoutToShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmitted] = useState(false)
  const [requestError, setRequestError] = useState()

  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0

  const cartItemToRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemToAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const orderHandler = () => {
    setCheckoutToShown(true)
  }
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    try {
      await fetch(`${process.env.REACT_APP_FIREBASE_URL}/orders.json`, {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      })
      setSubmitted(true)
      cartCtx.clearCart()
    } catch (error) {
      setRequestError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  if (requestError) {
    return (
      <section className={classes.requestError}>
        <p>{requestError}</p>
      </section>
    )
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          company={item.company}
          img={item.img}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemToRemoveHandler.bind(null, item.id)}
          onAdd={cartItemToAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )
  const orderingIsNotActive = (
    <div className={classes.actions}>
      <CloseBtn onClose={props.onClose} className={classes.button} />
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOutIsShown && (
        <CheckOut onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkOutIsShown && orderingIsNotActive}
    </React.Fragment>
  )
  const submittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = (
    <React.Fragment>
      <h1>Thank you for ordering!</h1>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Close</button>
      </div>
    </React.Fragment>
  )
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submittedOrder && cartModalContent}
      {isSubmitting && submittingModalContent}
      {submittedOrder && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
