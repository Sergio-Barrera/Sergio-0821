export const VALID_CARD = {
    numberCard: '1234123412341234',
    expirationDate: '12/26',
    cvv: '543',
    mount: 10000
} as const;

export const DECLINE_CARD = {
    "1234123412341231": 'INVALID_CARD',
    "1234123412341232": 'CARD_DECLINE',
    "1234123412341233":'EXPIRED_CARD',
} as const;