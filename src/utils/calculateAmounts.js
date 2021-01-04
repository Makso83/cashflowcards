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
    total += player[type][item];
  });
  return total;
};

export const calculatePayment = calculatorFactory('payments');

export const calculateIncome = calculatorFactory('incomes');

export const calculateNetAmount = (player) => calculateIncome(player) - calculatePayment(player);
