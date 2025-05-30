/**
 * Formatea un precio para visualización
 * @param price - El precio como string o número
 * @param locale - El locale para formatear el precio (default: 'es-ES')
 * @param currency - La moneda (default: 'USD')
 * @returns
 */
export function formatPrice(
  price: string | number | undefined,
  locale = "es-ES",
  currency = "USD"
): string {
  if (price === undefined || price === null || price === "") {
    return "Gratis";
  }

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // Si no es un número válido (NaN)
  if (isNaN(numericPrice)) {
    return "Gratis";
  }

  // Si el precio es 0, devolver "Gratis"
  if (numericPrice === 0 || numericPrice === 0.0) {
    return "Gratis";
  }

  return numericPrice.toFixed(2);
}
