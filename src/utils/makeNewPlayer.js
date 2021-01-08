import uniqueId from 'lodash.uniqueid';
import { getPayment } from './calculateAmounts';
import { randomTemplate } from './randomTemplate';

const makeNewPlayer = (nameValue, templates) => {
  const newPlayer = randomTemplate(templates);
  newPlayer.playerName = nameValue;
  newPlayer.uid = uniqueId();
  newPlayer.payments = { ...newPlayer.payments, ...getPayment(newPlayer) };
  return newPlayer;
};

export default makeNewPlayer;
