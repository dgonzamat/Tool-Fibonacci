import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FibonacciVisualizer from "./FibonacciVisualizer"

describe("FibonacciVisualizer", () => {
  it("renders 12 sequence cells with accessible names", () => {
    render(<FibonacciVisualizer />)
    expect(screen.getByRole("listitem", { name: /F\(0\) = 0/ })).toBeInTheDocument()
    expect(screen.getByRole("listitem", { name: /F\(11\) = 89/ })).toBeInTheDocument()
  })

  it("starts with F(0) marked as current", () => {
    render(<FibonacciVisualizer />)
    const zero = screen.getByRole("listitem", { name: /F\(0\) = 0/ })
    expect(zero).toHaveAttribute("aria-current", "true")
  })

  it("clicking a cell sets it as the current value", async () => {
    const user = userEvent.setup()
    render(<FibonacciVisualizer />)

    // Pause autoplay so the test isn't racing the interval
    await user.click(screen.getByRole("button", { name: "Pausar" }))

    const five = screen.getByRole("listitem", { name: /F\(5\) = 5/ })
    await user.click(five)
    expect(five).toHaveAttribute("aria-current", "true")
  })
})
