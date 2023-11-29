import { Customer } from '../entities/customer.model';

export const mockCutomerList: Customer[] = [
  {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    passportNumber: 'passportNumber',
    nationalIdetificationNumber: 'nationalIdetificationNumber',
    address: {
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      zip: '10-050',
      city: 'Wroclaw',
      country: 'Poland',
    },
  },
];
