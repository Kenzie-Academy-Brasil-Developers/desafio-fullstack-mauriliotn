import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  fullName: string;
  email: string;
  telephone: string;
  createdAt: Date;
  userId: string;
  constructor() {
    this.id = randomUUID();
  }
}
