import { ItemLocation } from './../../models/location';
import { Component, Inject } from '@angular/core';
import { Item, Kind, Category } from 'src/app/models/item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent {

  //public item = new Item();



  constructor(public itemService: ItemService, public dialogRef: MatDialogRef<UpdateItemComponent>, @Inject(MAT_DIALOG_DATA) public item: Item) {}

  onSubmit()
  {
    this.itemService.updateItem(this.item);
    this.dialogRef.close();
  }
  
  get categories()
  {

    return Object.keys(Category);
  }

  get kinds()
  {
    return Object.keys(Kind);
  }

  itemDate(date:string)
  {
    return new Date (date);
  }
  
  handleAddressChange(location) {
    let currLocation = new ItemLocation();
    currLocation.name = location.formatted_address;
    currLocation.lng = location.geometry.location.lng();
    currLocation.lat = location.geometry.location.lat();
    this.item.location = currLocation;
  }

}


