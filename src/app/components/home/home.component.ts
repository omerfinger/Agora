import { UserModel } from './../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../utils/Globals';
import { WebsocketService } from 'src/app/services/WebSockets.service';
import { MatDialog } from '@angular/material';
import { NewMessageDialogComponent } from '../new-message-dialog/new-message-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home {
  private user: UserModel = {} as UserModel;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private globals: Globals,
              private socket: WebsocketService,
              private dialog: MatDialog
              ) {

  }
  
  ngOnInit()
  {    
    this.route.
      queryParams.
      subscribe(params => {
        this.user = this.globals.connectedUser;
    });

    this.socket.sendUserID(this.globals.connectedUser._id);

    this.socket.newMessage().subscribe((message) => {
      const dialogRef = this.dialog.open(NewMessageDialogComponent, {data: message, height: '250px', width: '450px'});
    });

  }

}
