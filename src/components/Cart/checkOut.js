import { useRef, useState } from 'react'
import classes from './checkOut.module.css'

const isEmpty = (input) => input.trim() === ''

const isPostalCodeValid = (input) => input.trim().length === 4

const CheckOut = (props) => {
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  // Checking form validity and touched state
  const [formInputValidity, setFormInputValidity] = useState({
    name: false,
    street: false,
    city: false,
    postalCode: false,
  })
  const [formInputWasTouched, setFormInputWasTouched] = useState({
    name: false,
    street: false,
    city: false,
    postalCode: false,
  })
  // BlUr event handlers
  const nameInputBlurHandler = (event) => {
    setFormInputWasTouched({ name: true })
    if (!isEmpty(event.target.value)) {
      setFormInputValidity({ name: true })
    }
  }
  const streetInputBlurHandler = (event) => {
    setFormInputWasTouched({ street: true })
    if (!isEmpty(event.target.value)) {
      setFormInputValidity({ street: true })
    }
  }
  const postalCodeInputBlurHandler = (event) => {
    setFormInputWasTouched({ postalCode: true })
    if (isPostalCodeValid(event.target.value)) {
      setFormInputValidity({ postalCode: true })
    }
  }
  const cityInputBlurHandler = (event) => {
    setFormInputWasTouched({ city: true })
    if (!isEmpty(event.target.value)) {
      setFormInputValidity({ city: true })
    }
  }

  // form submission
  const confirmHandler = (event) => {
    event.preventDefault()

    setFormInputWasTouched({
      name: true,
      street: true,
      city: true,
      postalCode: true,
    })
    // getting input values
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value
    // checking input validity
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = isPostalCodeValid(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    })

    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid
    if (!formIsValid) {
      return
    }
    props.onSubmit({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    })
  }

  const isEnteredNameInvalid =
    !formInputValidity.name && formInputWasTouched.name
  const isEnteredStreetInvalid =
    !formInputValidity.street && formInputWasTouched.street
  const isEnteredPostalCodeInvalid =
    !formInputValidity.postalCode && formInputWasTouched.postalCode
  const isEnteredCityInvalid =
    !formInputValidity.city && formInputWasTouched.city

  const nameControlClasses = `${classes.control} ${
    !isEnteredNameInvalid ? '' : classes.invalid
  }`
  const streetControlClasses = `${classes.control} ${
    !isEnteredStreetInvalid ? '' : classes.invalid
  }`
  const postalCodeControlClasses = `${classes.control} ${
    !isEnteredPostalCodeInvalid ? '' : classes.invalid
  }`
  const cityControlClasses = `${classes.control} ${
    !isEnteredCityInvalid ? '' : classes.invalid
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          onBlur={nameInputBlurHandler}
        />
        {isEnteredNameInvalid && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Enter Your Street </label>
        <input
          type="text"
          id="street"
          ref={streetInputRef}
          onBlur={streetInputBlurHandler}
        />
        {isEnteredStreetInvalid && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Enter Your Postal Code </label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          onBlur={postalCodeInputBlurHandler}
        />
        {isEnteredPostalCodeInvalid && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Enter Your City </label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          onBlur={cityInputBlurHandler}
        />
        {isEnteredCityInvalid && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Checkout</button>
      </div>
    </form>
  )
}
export default CheckOut
