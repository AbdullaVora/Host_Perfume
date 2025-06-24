import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <h2 className="text-lg font-bold text-red-700">Something went wrong.</h2>
          <details className="mt-2 text-sm text-red-600">
            <summary>Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap">
              {this.state.error?.toString()}
            </pre>
            <pre className="mt-2 text-xs opacity-70">
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;