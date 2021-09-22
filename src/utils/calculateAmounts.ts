import { Payments, Player } from '../@types/common';
import { ExtendedPayments } from './makeNewPlayer';
import { Incomes } from '../constants/playersTemplates';

export const getPayment = (player: Player) => {
  if (!player) {
    return {};
  }
  const { debts } = player;
  const payments: Payments = {
    education: +debts.education * 0.005,
    car: +debts.car * 0.02,
    card: +debts.cards * 0.03,
    house: Math.round((+debts.house * 0.0095) / 100) * 100,
    shops: +debts.shops * 0.05,
    bank: +debts.bank * 0.1,
    children: 0,
  };

  if (player.children) {
    payments.children = player.children * player.perChild;
  }
  return payments;
};

type Flows = 'payments' | 'incomes'

const calculatorFactory = (type: Flows) => (player: Player) => {
  let total = 0;
  if (!player) {
    return null;
  }
  const list = Object.keys(player[type]);
  const element = player[type];
  list.forEach((item) => {
    const incomeElement = (element as any)[item];
    if (incomeElement && Array.isArray(incomeElement)) {
      total += incomeElement.reduce((acc, property) => acc + property.income, 0);
    } else {
      total += incomeElement;
    }
  });
  return total;
};

export const calculatePayment = calculatorFactory('payments');

export const calculateIncome = calculatorFactory('incomes');

export const calculateNetAmount = (player: Player) => {
  const totalIncome = calculateIncome(player);
  const totalPayments = calculatePayment(player);
  return totalIncome && totalPayments ? totalIncome - totalPayments : 0;
};
// eslint-disable-next-line max-len
export const calculateAmountByType = (player: Player, flow: Flows, type: keyof (ExtendedPayments & Incomes)): number | never => {
  if (!player) {
    return 0;
  }
  try {
    const cashFlow = player[flow];
    if (!cashFlow) {
      throw new Error('Неверное значение потока');
    }
    if (!cashFlow.hasOwnProperty(type)) {
      throw new Error('Неверное значение статьи');
    }
    // @ts-ignore
    const amount = cashFlow[type];

    if (Array.isArray(amount)) {
      return amount.reduce((acc, property) => acc + property.income, 0);
    }
    return amount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
