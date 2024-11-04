export const formatCpfCnpj = (value: string) => {
  let cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

  if (cleanedValue.length <= 11) {
    // Limita para CPF
    cleanedValue = cleanedValue.slice(0, 11); // Limita o valor a 11 dígitos
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } else {
    // Limita para CNPJ
    cleanedValue = cleanedValue.slice(0, 14); // Limita o valor a 14 dígitos
    return cleanedValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
};
