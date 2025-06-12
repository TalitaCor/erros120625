import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar UI alternativa na próxima renderização
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro em algum serviço de log
    console.error("Erro capturado pelo Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza fallback UI
      return <h2>Algo deu errado ao carregar o filme.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
