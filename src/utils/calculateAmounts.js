export const getPayment = (player) => {
  const { debts } = player;
  const payments = {};
  payments.education = +debts.education * 0.005;
  payments.car = +debts.car * 0.02;
  payments.card = +debts.cards * 0.03;
  payments.house = Math.round((+debts.house * 0.0095) / 100) * 100;
  payments.shops = +debts.shops * 0.05;
  if (player.children) {
    payments.children = player.children * player.perChild;
  }
  return payments;
};

const calculatorFactory = (type) => (player) => {
  let total = 0;
  const list = Object.keys(player[type]);
  list.forEach((item) => {
    const incomeElement = player[type][item];
    if (Array.isArray(incomeElement)) {
      total += incomeElement.reduce((acc, property) => acc + property.income, 0);
    } else {
      total += incomeElement;
    }
  });
  return total;
};

export const calculatePayment = calculatorFactory('payments');

export const calculateIncome = calculatorFactory('incomes');

export const calculateNetAmount = (player) => calculateIncome(player) - calculatePayment(player);

export const calculateAmountByType = (player, flow, type) => {
  try {
    const cashFlow = player[flow];
    if (!cashFlow) {
      throw new Error('Неверное значение потока');
    }
    const amount = cashFlow[type];
    if (!amount) {
      throw new Error('Неверное значение статьи');
    }
    if (Array.isArray(amount)) {
      return amount.reduce((acc, property) => acc + property.income, 0);
    }
    return amount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
