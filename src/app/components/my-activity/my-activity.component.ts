import { Component, OnInit } from '@angular/core';
import { Globals } from '../utils/Globals';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivity implements OnInit {
  
  private user_id:string;
  private messagesAmount: number;

  constructor(private globals:Globals, private messageService: MessageService) {
    this.user_id = globals.connectedUser._id;
  }

  ngOnInit() {
    this.messageService.getItemsAmountByUser(this.user_id).subscribe(res => { this.messagesAmount = res.amount});
  }


}
