export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SLlgiJvohmnNpSvYvujjCa9',
    name: 'ريادي',
    description: 'خطة اشتراك مميزة مع ميزات متقدمة',
    mode: 'subscription',
    price: 9.00,
    currency: 'usd',
    currencySymbol: '$'
  }
];