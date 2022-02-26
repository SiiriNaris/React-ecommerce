import classes from './CartItem.module.css'
const CartItem = (props) => {
  const totalPrice = (props.amount * props.price).toFixed(2)
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
        <p>{`${props.amount} x ${props.price}`}</p>
      </div>
      <span>{totalPrice}</span>
    </li>
  )
}

export default CartItem
