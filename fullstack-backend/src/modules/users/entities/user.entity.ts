import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export const formatDate = (date) => {
  const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

  return [day, month, year].join('/');
}

export class User {
  readonly id: string;
  fullName: string;
  email: string;

  @Exclude()
  password: string;

  telephone: string;
  createdAt: Date;
  constructor() {
    this.id = randomUUID();
  }
}
