'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SimpleGlassCard } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de informes de errores
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <SimpleGlassCard variant="heavy" className="p-8 text-center max-w-md">
            <h2 className="text-3xl font-heading font-bold text-red-500 mb-4">¡Algo salió mal!</h2>
            <p className="font-body opacity-80 mb-4">
              Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Recargar Página
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left text-sm opacity-70">
                <summary>Detalles del Error</summary>
                <pre className="whitespace-pre-wrap break-all mt-2">
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </SimpleGlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
