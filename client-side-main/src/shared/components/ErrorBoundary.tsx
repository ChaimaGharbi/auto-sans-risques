import { Component } from 'react'

export default class ErrorBoundary extends Component<
  {},
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>ERROR</h1>
    }

    return this.props.children
  }
}
