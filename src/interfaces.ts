export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  userType?: UserType;
}

export type Component = {
  _id: string;
  currency: string;
  discounted_price: string;
  source: string;
  standard_price: string;
  title: string;
  type: string;
};

export type UserType = 'USER' | 'ADMIN';
