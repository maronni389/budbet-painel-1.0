const numberToReais = (valor) => valor.toLocaleString('pt-br', { minimumFractionDigits: 2 });

const reaisToNumber = (valor) => parseInt(valor.replace('/D/g', ''));

const centsToMoney = (valor) => (valor / 100.00);

const MoneyToCents = (valor) => (valor * 100);

const { format: formatCurrency } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export { numberToReais, reaisToNumber, formatCurrency, centsToMoney, MoneyToCents };
