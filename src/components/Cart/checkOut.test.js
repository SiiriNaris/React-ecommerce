import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckOut from './checkOut'
import '@testing-library/jest-dom'

describe('testing name input', () => {
  test('name input field is shown', () => {
    // ARRANGE
    render(<CheckOut />)

    // ACT
    // ...
    // ASSERT;
    const nameElement = screen.queryAllByLabelText('your name', {
      exact: false,
    })
    expect(nameElement).toBeTruthy()
  })
  test('typing into input', () => {
    render(<CheckOut />)

    const input = screen.getByLabelText(/your name/i)
    userEvent.type(input, 'samuel')
    expect(input.value).toBe('samuel')
  })
  test('rendering paragraph conditionally', () => {
    render(<CheckOut />)

    const nameInput = screen.getByLabelText(/your name/i)
    const streetInput = screen.getByLabelText(/enter your street/i)
    // userEvent.type(nameInput, 'sam')
    // userEvent.clear(nameInput)
    // userEvent.type(streetInput, 'street')
    // OR ...
    nameInput.focus()
    streetInput.focus()
    const target = screen.getByText('Please enter a valid name')
    console.log(target)
    expect(target).toBeInTheDocument()
  })
})
