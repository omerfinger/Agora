import { UserFilter } from './../../models/userFilter';
import { UserModel } from './../../models/user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ItemService} from '../../services/item.service'

@Component({
  selector: 'search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent {
  @Output() fieldsDataOutput = new EventEmitter();
  
  user: UserModel = {} as UserModel;
  fieldsData = {} as UserFilter;

  constructor() {     
  }

  submit() {
    this.user.fullName ? this.fieldsData.name = this.user.fullName.toString() : "";
    this.user.city ? this.fieldsData.city = this.user.city.toString() : "";

    this.fieldsDataOutput.emit(this.fieldsData);
  }

  public handleAddressChange(city) {
    this.user.city = city.formatted_address;
  }
}
