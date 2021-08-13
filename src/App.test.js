import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import userEvents from '@testing-library/user-event'

test('renders the app', () => {
  render(<App />)

  // Header
  expect(() => screen.getByText(/Research Data JCU – Visual Editor/i)).not.toThrow()

  // Footer
  expect(() => screen.getByText(/Research Data JCU team/i)).not.toThrow()

  // Copy all button
  expect(() => screen.getByText(/copy all/i)).not.toThrow()
})

test('copy all function works', async () => {
  const writeTextFn = jest.fn(async () => {})

  Object.assign(navigator, {
    clipboard: {
      writeText: writeTextFn,
    },
  });

  render(<App />)

  // Copy all button
  expect(() => screen.getByText(/copy all/i)).not.toThrow()

  const copyAllButton = screen.getByText(/copy all/i)

  // Copy all button
  userEvents.click(copyAllButton)

  // Text Copied to Clipboard
  await waitFor(() =>{
    expect(writeTextFn).toBeCalledTimes(1)
    screen.getByText(/Content copied to clipboard!/i)
  })
})
