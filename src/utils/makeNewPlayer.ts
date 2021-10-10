import uniqueId from 'uniqid';
import { getPayment } from './calculateAmounts';
import { randomTemplate } from './randomTemplate';
import { Payments, PlayerTemplate, Templates } from '../constants/playersTemplates';

export interface ExtendedPayments extends Payments {
  bank: number,
}

export interface ExtendedPlayer extends PlayerTemplate {
  children: number,
  playerName: string,
  uid: string,
  payments: ExtendedPayments,
}

const makeNewPlayer = (nameValue: string, templates: Templates) => {
  const newPlayer = randomTemplate(templates);
  if (!newPlayer) {
    return null;
  }
  const extendedPlayer: ExtendedPlayer = {
    ...newPlayer,
    children: 0,
    playerName: nameValue,
    uid: uniqueId(),
    payments: {
      ...newPlayer.payments,
      bank: 0,
    },
  };
  extendedPlayer.payments = { ...extendedPlayer.payments, ...getPayment(extendedPlayer) };
  return extendedPlayer;
};

export default makeNewPlayer;
