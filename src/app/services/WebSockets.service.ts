import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class WebsocketService {

  private socket;

  constructor() {
    this.socket = socketIo();
   }

   sendUserID(id: string) {
     this.socket.emit('sendUser', id);
   }

   public newMessage = () => {
    return Observable.create((observer) => {
        this.socket.on('newMessage', (message) => {
            observer.next(message);
        });
    });
}



}