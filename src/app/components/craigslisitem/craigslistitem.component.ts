import { Component } from "@angular/core";
import { ItemService } from "../../services/item.service";

@Component({
  selector: "craigs-list",
  templateUrl: "./craigslistitem.component.html",
  styleUrls: ["./craigslistitem.component.css"]
})
export class CraigsListItem {
  items: Object[];

  constructor(public itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getCraigslistItems().subscribe(res => {
      this.items = res;
    });
  }
  get itemsLenght() {
    if (this.items != null) {
      return this.items.length;
    }
    return 0;
  }
}
