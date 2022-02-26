import { Fragment } from 'react'
import AvailableProducts from '../Products/AvailableProducts'
import classes from './ProductsContainer.module.css'

const ProductsContainer = (props) => {
  return (
    <Fragment>
      <section className={classes.products}>
        <div className={classes.container}>
          <h2>Available Products</h2>
          <AvailableProducts />
        </div>
      </section>
    </Fragment>
  )
}
export default ProductsContainer
