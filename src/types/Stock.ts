import { StockProperty, Price } from '@/types';
import { InstrumentType } from '@/types/InstumentType';

export interface Stock {
    instrumentId: string;
    figi: string;
    name: string;
    ticker: string;
    icon: string;
    price: Price;
    instrumentType: InstrumentType;
    properties: StockProperty[];
}
