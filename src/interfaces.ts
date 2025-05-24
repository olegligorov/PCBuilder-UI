export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  userType?: UserType;
}

export type UserType = 'USER' | 'ADMIN';
