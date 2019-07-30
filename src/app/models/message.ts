import { UserModel } from './user';

export class Message {
    _id: number;
    fromUser: string;
    toUser: string;
    title: string;
    content: string;
    create_time: Date;
    isRead: boolean;
    item: string;

}