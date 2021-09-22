import uniqid from 'uniqid';

export interface Incomes {
  salary: number,
  investing: Array<unknown>,
  dividends: Array<unknown>,
  estate: Array<unknown>,
}

type DebtsTypes = 'house' | 'education' | 'car' | 'cards' | 'shops' | 'bank'
type PaymentsTypes = 'taxes' | 'other'

export type Debts = Record<DebtsTypes, number>
export type Payments = Record<PaymentsTypes, number>

export interface PlayerTemplate {
  professionId: string,
  profession: string,
  incomes: Incomes,
  perChild: number,
  cash: number,
  debts: Debts,
  payments: Payments,
}

export type Templates = Array<PlayerTemplate>

const templates: Templates = [
  {
    professionId: uniqid(),
    profession: 'Конструктор',
    incomes: {
      salary: 4900,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 250,
    cash: 400,
    debts: {
      house: 75000,
      education: 12000,
      car: 7000,
      cards: 4000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 1050,
      other: 1090,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Механик',
    incomes: {
      salary: 2000,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 110,
    cash: 670,
    debts: {
      house: 31000,
      education: 0,
      car: 3000,
      cards: 2000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 360,
      other: 450,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Врач',
    incomes: {
      salary: 13200,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 640,
    cash: 400,
    debts: {
      house: 202000,
      education: 150000,
      car: 19000,
      cards: 9000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 3420,
      other: 2880,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Секретарь',
    incomes: {
      salary: 2500,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 140,
    cash: 710,
    debts: {
      house: 38000,
      education: 0,
      car: 4000,
      cards: 2000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 460,
      other: 570,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Офицер полиции',
    incomes: {
      salary: 3000,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 160,
    cash: 520,
    debts: {
      house: 46000,
      education: 0,
      car: 5000,
      cards: 2000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 580,
      other: 690,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Учитель',
    incomes: {
      salary: 3300,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 180,
    cash: 400,
    debts: {
      house: 50000,
      education: 12000,
      car: 5000,
      cards: 3000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 630,
      other: 760,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Офис менеджер',
    incomes: {
      salary: 4600,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 240,
    cash: 400,
    debts: {
      house: 75000,
      education: 12000,
      car: 6000,
      cards: 3000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 910,
      other: 1000,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Водитель грузовика',
    incomes: {
      salary: 2500,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 140,
    cash: 750,
    debts: {
      house: 38000,
      education: 0,
      car: 4000,
      cards: 2000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 460,
      other: 570,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Медсестра',
    incomes: {
      salary: 3100,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 170,
    cash: 480,
    debts: {
      house: 47000,
      education: 6000,
      car: 5000,
      cards: 3000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 600,
      other: 710,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Пилот',
    incomes: {
      salary: 9500,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 480,
    cash: 400,
    debts: {
      house: 143000,
      education: 0,
      car: 15000,
      cards: 22000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 2350,
      other: 2210,
    },
  },
  {
    professionId: uniqid(),
    profession: 'Адвокат',
    incomes: {
      salary: 7500,
      investing: [],
      dividends: [],
      estate: [],
    },
    perChild: 640,
    cash: 400,
    debts: {
      house: 115000,
      education: 78000,
      car: 11000,
      cards: 6000,
      shops: 1000,
      bank: 0,
    },
    payments: {
      taxes: 1830,
      other: 1650,
    },
  },
];

export default templates;
