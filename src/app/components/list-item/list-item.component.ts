import { Component, OnInit, Input } from '@angular/core';
import { Item, Kind, Category } from 'src/app/models/item'
import { fadeInItems } from '@angular/material';
import {ItemService} from '../../services/item.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {UpdateItemComponent} from '../update-item/update-item.component';
import { CreateMessageDialogComponent } from '../create-message/create-message-dialog.component'
import { Globals } from '../utils/Globals';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() scope_kind:Kind;
  @Input() user_id:string;

  items: Item[];
  private itemsSub: Subscription;

  constructor(public itemService: ItemService, public dialog: MatDialog, private global: Globals) {
    
   }

  ngOnInit() {
    
    if(this.scope_kind != null) {
      this.itemService.getItemsByKind(this.scope_kind).subscribe(res => { this.items = res.items.filter(
        item => item.kind == this.scope_kind
      ) });
    }

    else if (this.user_id != null) {
      this.itemService.getItemsByUser(this.user_id).subscribe(res => { this.items = res.items});
    }
    this.itemsSub = this.itemService.getItemsUpdatelistener().subscribe((items:Item[]) => {this.items = items});
  }

  edit(item:Item) {
    const dialogRef = this.dialog.open(UpdateItemComponent, { data: item ,height: '520px', width: '750px'});

    dialogRef.afterClosed().subscribe(result => {console.log( `Result: ${result}` )});
  }

  delete(item:Item) {
    //this.items.slice(this.items.indexOf(item), 1);
    this.itemService.deleteItem(item);
  }

  get itemsLenght()
  {
    if(this.items != null) {
      return this.items.length;
    }
    return 0;
  }

  itemDate(date:string)
  {
    let formatted = new Date (date);
    return formatted.toLocaleDateString('en-US', { hour12: false, month: 'long', day:'numeric', year:'numeric'});
  }

  isChangable(item)
  {
    if (this.global.connectedUser._id == item.username._id || this.global.connectedUser.admin == true) {
      return true;
    }

    return false;
  }

}
