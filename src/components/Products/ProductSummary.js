import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import AddToCart from './Buttons/AddToCart'
import CloseBtn from './Buttons/CloseBtn'
import classes from './ProductSummary.module.css'

const ProductSummary = (props) => {
  const price = `$${props.product.price.toFixed(2)}`
  const image = `${props.product.img}`

  const cartCtx = useContext(CartContext)
  const addItemToCartHandler = () => {
    console.log('should reveive an product')
    cartCtx.addItem({
      id: props.product.id,
      name: props.product.name,
      amount: 1,
      price: props.product.price,
    })
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <img className={classes.image} src={image} alt="product"></img>
        <div className={classes.description}>
          <h1>{props.product.name}</h1>
          <p className={classes.description}>{props.product.description}</p>
        </div>
        <div className={classes.info}>
          <h2>Design by {props.product.company}</h2>
          <h1>{price}</h1>
        </div>
        <div className={classes.actions}>
          <CloseBtn className={classes.button} onClose={props.onClose} />
          <AddToCart onClick={addItemToCartHandler} />
        </div>
      </div>
    </Modal>
  )
}

export default ProductSummary
