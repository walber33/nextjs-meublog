export const toStandardDate = (dateStr: string | Date) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' });
};