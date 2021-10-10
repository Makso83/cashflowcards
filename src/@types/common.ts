import makeNewPlayer from '../utils/makeNewPlayer';

type NewPlayerFunc = typeof makeNewPlayer

export type Player = ReturnType<NewPlayerFunc>

export type PaymentNames = 'education' | 'car' | 'card' | 'house' | 'shops' | 'bank' | 'children';

export type Payments = {
    [P in PaymentNames]: number
}
