import { Pipe, PipeTransform } from '@angular/core';
import * as hll from 'distinct-value-counter';
import { UserModel } from './../models/user';

@Pipe({name: 'messagesPipe'})
export class MessagesPipe implements PipeTransform {
    transform(messages: []): number {
        const hllCounter = hll(0.001);

        messages.forEach(message => {
            const currUser: UserModel = message["fromUser"];
            hllCounter.add(currUser.mail)
        })
        
        return hllCounter.count();
    }
}