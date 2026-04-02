import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-svh bg-rbn-void px-6 py-16 text-rbn-fog">
          <h1 className="font-display text-xl font-semibold text-rbn-white">Something went wrong</h1>
          <p className="mt-3 max-w-xl text-sm text-rbn-muted">
            The app hit a runtime error. Open the browser developer console (F12) for details, or try a
            hard refresh. If you recently changed dependencies, delete{' '}
            <code className="rounded bg-rbn-surface px-1 py-0.5 text-xs">client/node_modules/.vite</code>{' '}
            and run <code className="rounded bg-rbn-surface px-1 py-0.5 text-xs">npm run dev</code> again.
          </p>
          <pre className="mt-6 max-h-48 overflow-auto rounded-lg border border-rbn-border bg-rbn-base p-4 text-xs text-rbn-accent">
            {this.state.error?.message || String(this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
