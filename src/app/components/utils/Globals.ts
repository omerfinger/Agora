import { UserModel } from './../../models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    connectedUser: UserModel = {} as UserModel;
}