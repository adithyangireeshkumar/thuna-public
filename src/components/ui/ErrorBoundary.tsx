import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error intercepted by ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="max-w-xl mx-auto my-12 px-6 py-8 bg-glass border border-status-critical/30 rounded-2xl flex flex-col items-center text-center gap-4 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical">
            <span className="material-symbols-outlined text-4xl" style={{ color: '#ef4444' }}>error</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">System Notice: Interrupted Render</h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
            The transparency feed encountered a structural processing error. Sensitivity protections and crash controls prevented this from disrupting the core platform.
          </p>
          <div className="w-full bg-[#111827]/40 border border-white/5 rounded-lg p-4 font-mono text-left text-xs text-red-400 max-h-40 overflow-y-auto">
            {this.state.error?.toString()}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95 cursor-pointer mt-4"
          >
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
