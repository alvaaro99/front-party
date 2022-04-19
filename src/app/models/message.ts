import { User } from './user';

export interface Message {
  sender: User;
  content: string;
  date: Date;
}
