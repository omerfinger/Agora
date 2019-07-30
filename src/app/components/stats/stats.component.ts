import { MessageService } from './../../services/message.service';

import { Item } from './../../models/item';
import { map } from 'rxjs/operators';
import { ItemService } from './../../services/item.service';
import { barData } from './../../models/bar-data';
import { pieData } from './../../models/pie-data';
import { Component } from '@angular/core';
import { _MatListItemMixinBase } from '@angular/material';
import { from } from 'rxjs';
import { Message } from './../../models/message';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class Stats {
  private barChartData: barData[];
  private pieChartData: pieData[];
  private allItems: Item[];
  private lostItems: Item[];
  private foundItems: Item[];
  private allMessages: [];
  
  constructor(private itemService: ItemService,
              private messageService: MessageService) {
    this.getAllMessages();
  }

  ngOnInit() {
    this.itemService.getItemsByCategoryPieChart().subscribe(res => {
      console.log(res.data);
      this.pieChartData = res.data.map(item => { 
        return ({
          label: `${item._id.name} (${item.count})`,
          value: item.count
        });
      })
    });

    this.itemService.getItems().subscribe(res => {
      this.allItems = res.items;
      this.lostItems = this.allItems.filter(item => item.kind == "Lost");
      this.foundItems = this.allItems.filter(item => item.kind == "Found");
    })
  }

  
  getAllMessages() {
    this.messageService.getAllMessages().subscribe(messages => {
       this.allMessages = messages.allMessages;
    })
  }

  latitude = 32.083824;
  longitude = 34.791062;
  mapType = 'roadmap';
}
