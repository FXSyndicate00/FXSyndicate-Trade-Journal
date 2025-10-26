
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
