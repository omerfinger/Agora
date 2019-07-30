import { Component, OnInit, Input } from '@angular/core';
import { Item, Kind, Category } from 'src/app/models/item';
import {Message} from 'src/app/models/message';
import {MessageService} from '../../services/message.service';
import { Subject, Subscription } from 'rxjs';
import { CreateMessageDialogComponent } from '../create-message/create-message-dialog.component';
import { MatDialog } from '@angular/material';
import { Globals } from '../utils/Globals';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {

  @Input() item:Item;

  private messagesSub: Subscription;



  messages: Message[];

  constructor(public messageService:MessageService, public dialog: MatDialog, private globals: Globals) { }

  ngOnInit() {
    this.messageService.getMessagesByItem(this.item).subscribe(res => { this.messages = res.messages.sort(this.dateSort); });
    this.messagesSub = this.messageService.getMessagesUpdatelistener().subscribe((messages: Message[]) => {this.messages = messages.sort(this.dateSort)});
  }

  writeMessage(){
    const dialogRef = this.dialog.open(CreateMessageDialogComponent, {data: this.item, height: '550px', width: '600px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log( `Result: ${result}` )
      // Refresh list
      if (result) {
        this.messageService.getMessagesByItem(this.item).subscribe(res => { this.messages = res.messages.sort(this.dateSort); });
      }
    });
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
    if(!message.isRead && (this.globals.connectedUser._id == message.toUser._id))
    {
      this.messageService.markAsRead(message);
    }
  }



}
