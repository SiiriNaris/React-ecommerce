import { act, render, screen } from '@testing-library/react'
import AvailableProducts from './AvailableProducts'

describe('Async component', () => {
  // NOTE> FOR THE SAME CALL, the mock resetAllMocks does not clear the mocks. Seems to be a larger issue with the jest library
  // test('showing is: Loading...', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation()

  //   render(<AvailableProducts />)

  //   const loading = screen.findByText('Loading...')
  //   expect(loading).toBeTruthy()
  // })

  test('renders posts if request succeeds', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              key: 'p1',
              id: 'p1',
              name: 'Chair',
              company: 'Hello',
              img: 'img',
              description: 'a nice chair',
              price: 10.99,
            },
          ]),
      })
    )
    await act(async () => {
      render(<AvailableProducts />)
    })

    const productElement = screen.getByText('Chair')

    expect(productElement).toBeTruthy()

    jest.clearAllMocks()
  })
})
