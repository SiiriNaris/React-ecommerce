import React, { useEffect } from 'react'
import { useState } from 'react'
import classes from '../Products/AvailableProducts.module.css'
import ProductItem from './ProductItem'
import ProductSummary from './ProductSummary'

const AvailableProducts = (props) => {
  const [summaryIsShown, setSummaryIsShown] = useState(false)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requestError, setRequestError] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FIREBASE_URL}/products.json`
        )
        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        const responseData = await response.json()
        const loadedProducts = []

        for (const key in responseData) {
          loadedProducts.push({
            key: key,
            id: key,
            name: responseData[key].name,
            company: responseData[key].company,
            img: responseData[key].img,
            description: responseData[key].description,
            price: responseData[key].price,
          })
        }

        setProducts(loadedProducts)
      } catch (error) {
        setRequestError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }
  if (requestError) {
    return (
      <section className={classes.requestError}>
        <p>{requestError}</p>
      </section>
    )
  }

  const showSummaryHandler = (product) => {
    setProduct(product)
    setSummaryIsShown(true)
  }
  const hideSummaryHandler = () => {
    setProduct(null)
    setSummaryIsShown(false)
  }

  const productList = products.map((product) => (
    <ProductItem
      onShowSummary={showSummaryHandler}
      key={product.key}
      product={product}
    />
  ))

  return (
    <div className={classes.container}>
      {summaryIsShown && (
        <ProductSummary onClose={hideSummaryHandler} product={product} />
      )}
      {productList}
    </div>
  )
}
export default AvailableProducts
