import classes from './checkOut.module.css'
import useForm from '../../hooks/use-form'

const isNotEmpty = (input) => input.trim() !== ''
const isPostalCodeValid = (input) => input.trim().length === 4

const CheckOut = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useForm(isNotEmpty)
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputIsInvalid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: streetReset,
  } = useForm(isNotEmpty)
  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalcodeInputIsInvalid,
    valueChangeHandler: postalcodeChangeHandler,
    inputBlurHandler: postalcodeInputBlurHandler,
    reset: postalReset,
  } = useForm(isPostalCodeValid)
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputIsInvalid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: cityReset,
  } = useForm(isNotEmpty)

  const formIsValid =
    enteredCityIsValid &&
    enteredStreetIsValid &&
    enteredNameIsValid &&
    enteredPostalCodeIsValid

  // form submission
  const confirmHandler = (event) => {
    event.preventDefault()
    nameReset()
    cityReset()
    streetReset()
    postalReset()
    if (!formIsValid) {
      return
    }
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    })
  }

  const nameControlClasses = `${classes.control} ${
    nameInputIsInvalid ? classes.invalid : ''
  }`
  const streetControlClasses = `${classes.control} ${
    streetInputIsInvalid ? classes.invalid : ''
  }`
  const postalCodeControlClasses = `${classes.control} ${
    postalcodeInputIsInvalid ? classes.invalid : ''
  }`
  const cityControlClasses = `${classes.control} ${
    cityInputIsInvalid ? classes.invalid : ''
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameInputBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p>Please enter a valid name</p>}
        {/* {isEnteredNameInvalid && <p>Please enter a valid name</p>} */}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Enter Your Street </label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          value={enteredStreet}
          onBlur={streetInputBlurHandler}
        />
        {streetInputIsInvalid && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Enter Your Postal Code </label>
        <input
          type="text"
          id="postal"
          onChange={postalcodeChangeHandler}
          value={enteredPostalCode}
          onBlur={postalcodeInputBlurHandler}
        />
        {postalcodeInputIsInvalid && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Enter Your City </label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          value={enteredCity}
          onBlur={cityInputBlurHandler}
        />
        {cityInputIsInvalid && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Checkout
        </button>
      </div>
    </form>
  )
}
export default CheckOut
