/* globals describe, expect, it */

import { render, screen } from "@testing-library/react"
import App from "./App"

describe('<App />', () => {
  it('should return app component', () => {
    render ( <App />)
    const title = screen.getByRole('heading', {name: 'Vite + React'})
    expect(title).toBeInTheDocument();
  })
})