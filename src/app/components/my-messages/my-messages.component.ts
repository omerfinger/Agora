import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { Globals } from '../utils/Globals';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  messages: Message[];


  constructor(public messageService:MessageService, private globals: Globals) { }

  ngOnInit() {
    this.messageService.getMessagesByUser(this.globals.connectedUser._id).subscribe(res => { this.messages = res.messages.sort(this.dateSort)
      .filter(message => message.isRead == false); });
  }

  dateSort(a, b) {
    return new Date(b.create_time).getTime() - new Date(a.create_time).getTime();
  }

  formatDate(date:string)
  {
    let formatted = new Date (date);
    return formatted.toLocaleString('en-US', { hour12: false, month: 'long', day:'numeric', year:'numeric', hour: '2-digit', minute:'2-digit'});
  }

  get messagesLength() {
    if (this.messages != null) {
      return this.messages.length;
    }
    return 0;
  }

  onExpand(message){
    if(!message.isRead)
    {
      this.messageService.markAsRead(message);
    }
  }

}
