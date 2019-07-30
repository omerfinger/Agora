import { UserFilter } from './../../models/userFilter';
import { UserModel } from './../../models/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import UserService from '../../services/user.service';
import {MatDialog} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class Admin {
  form: FormGroup;
  filter = {} as UserFilter;
  filterUsers: UserModel[];
  allUsers: UserModel[];
  displayedColumns: string[] = ['select', 'fullName', 'mail', 'phone', 'city'];
  dataSource: MatTableDataSource<UserModel>;
  selection = new SelectionModel<UserModel>(true, []);

  constructor(private formBuilder: FormBuilder,
              private userServ: UserService, 
              public dialog: MatDialog) {
    this.form = this.formBuilder.group({
      users: new FormArray([], minSelectedCheckboxes(1))
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.userServ.getAllUsers().subscribe(usersJson => {
      this.allUsers = usersJson.users;
      this.filterUsers = this.allUsers;
      this.dataSource = new MatTableDataSource<UserModel>(this.filterUsers);
    });
  }

  getFilterUsers($event) {
    this.filter = $event;
    this.filterUsers = this.allUsers.filter(curr => 
      curr.fullName.includes(this.filter.name ? this.filter.name.toString() : "") && 
      curr.city.includes(this.filter.city ? this.filter.city.toString() : ""));
      this.dataSource.data = this.filterUsers;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  remove() {
    // const dialogRef = this.dialog.open(RemoveUserDialogContent).afterClosed().subscribe( result => { 
    //   const selectedUsersMails = this.selection.selected.map(selectedUser => selectedUser.mail);
    //   this.userServ.deleteUsers(selectedUsersMails).subscribe(res => {
    //     this.clearData();
    //     this.getUsers();
    //     });
    //   }); 

      const selectedUsersMails = this.selection.selected.map(selectedUser => selectedUser.mail);
      this.userServ.deleteUsers(selectedUsersMails).subscribe(res => {
        this.getAllUsers();
        });
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})

export class RemoveUserDialogContent {}
