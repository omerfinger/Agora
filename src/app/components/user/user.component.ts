import { Globals } from './../utils/Globals';
import { UserModel } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import UserService from 'src/app/services/user.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class User implements OnInit {
    private userDetails: UserModel = {} as UserModel; 
    private userDetailsPrev: UserModel = {} as UserModel; 

    constructor (public route: ActivatedRoute,
                 private userServ: UserService,
                 public dialog: MatDialog,
                 private globals: Globals) {
    }

    ngOnInit (){
        this.userDetails = this.globals.connectedUser;
        Object.assign(this.userDetailsPrev, this.userDetails);
    }

    public handleAddressChange(city) {
        this.userDetails.city = city.formatted_address;
    }

    saveChanges() {
        this.userServ.CreateOrUpdateUser(this.userDetails);
        Object.assign(this.userDetailsPrev, this.userDetails);
        const dialogRef = this.dialog.open(EditUserDialogContent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    cancelChanges() {
        Object.assign(this.userDetails, this.userDetailsPrev);
    }
}


@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
  })

  export class EditUserDialogContent {}