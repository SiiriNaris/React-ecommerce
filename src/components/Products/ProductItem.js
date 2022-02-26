import { useContext, Fragment } from 'react'
import CartContext from '../../store/cart-context'
import AddToCart from './Buttons/AddToCart'
import classes from './ProductItem.module.css'

const ProductItem = (props) => {
  const price = `$${props.product.price.toFixed(2)}`
  // const image = `${props.product.img}`
  const cartCtx = useContext(CartContext)

  const addItemToCartHandler = () => {
    cartCtx.addItem({
      id: props.product.id,
      name: props.product.name,
      amount: 1,
      price: props.product.price,
    })
  }

  return (
    <Fragment>
      <div className={classes.product}>
        <div>
          <img
            className={classes.image}
            src={props.product.img}
            alt="product"
          ></img>
          <h3>{props.product.name}</h3>
          <h2>{props.product.company}</h2>
          <div className={classes.price}>{price}</div>
        </div>
        <div className={classes.buttons}>
          <button onClick={() => props.onShowSummary(props.product)}>
            View More
          </button>
          <AddToCart onClick={addItemToCartHandler} />
        </div>
      </div>
    </Fragment>
  )
}

export default ProductItem
