
export enum TradePosition {
  LONG = 'Long',
  SHORT = 'Short',
}

export interface Trade {
  id: string;
  asset: string;
  entryDate: string;
  position: TradePosition;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  notes?: string;
  imageUrl?: string; // base64 string
}

export enum AccountType {
  LIVE = 'Live',
  FUNDED = 'Funded',
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
}
