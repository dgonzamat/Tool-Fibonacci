import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FibonacciVisualizer from "./FibonacciVisualizer"
import { I18nProvider } from "./i18n-provider"

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

describe("FibonacciVisualizer", () => {
  it("renders 12 sequence cells with accessible names", () => {
    renderWithI18n(<FibonacciVisualizer />)
    expect(screen.getByRole("listitem", { name: /F\(0\) = 0/ })).toBeInTheDocument()
    expect(screen.getByRole("listitem", { name: /F\(11\) = 89/ })).toBeInTheDocument()
  })

  it("starts with F(0) marked as current", () => {
    renderWithI18n(<FibonacciVisualizer />)
    const zero = screen.getByRole("listitem", { name: /F\(0\) = 0/ })
    expect(zero).toHaveAttribute("aria-current", "true")
  })

  it("clicking a cell sets it as the current value", async () => {
    const user = userEvent.setup()
    renderWithI18n(<FibonacciVisualizer />)

    // Pause autoplay so the test isn't racing the interval
    await user.click(screen.getByRole("button", { name: /Pause|Pausar/ }))

    const five = screen.getByRole("listitem", { name: /F\(5\) = 5/ })
    await user.click(five)
    expect(five).toHaveAttribute("aria-current", "true")
  })
})
