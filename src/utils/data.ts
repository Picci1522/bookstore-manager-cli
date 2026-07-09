export function formatarData(valor: Date | string): string {
  const d = valor instanceof Date ? valor : new Date(valor);
  return d.toLocaleDateString('pt-BR');
}