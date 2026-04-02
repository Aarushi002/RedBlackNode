import { Component } from 'react'

/** Isolates WebGL / drei failures so the rest of the page still renders. */
export class HeroCanvasBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.warn('[Hero 3D disabled]', error?.message, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,rgba(225,29,72,0.14),transparent_60%)]"
          aria-hidden
        />
      )
    }
    return this.props.children
  }
}
