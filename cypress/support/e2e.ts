// Importar comandos personalizados
import './commands';

// Ocultar errores de XHR que no son relevantes para los tests
Cypress.on('uncaught:exception', (err) => {
  // Retorna false para evitar que Cypress falle el test
  if (
    err.message.includes('ResizeObserver') ||
    err.message.includes('Cannot read properties of null')
  ) {
    return false;
  }
  // Si no es un error esperado, deja que Cypress falle el test
  return true;
});