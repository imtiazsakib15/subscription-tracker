export interface ISubscription {
  _id: string;
  name: string;
  price: number;
  currency: Currency;
  frequency: Frequency;
  category: Category;
  paymentMethod: string;
  status: Status;
  startDate: Date;
  renewalDate: Date;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Currency = 'BDT' | 'USD' | 'EUR';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Category =
  | 'sports'
  | 'entertainment'
  | 'news'
  | 'education'
  | 'health'
  | 'other';

export type Status = 'active' | 'cancelled' | 'expired';
