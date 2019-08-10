import { Component, OnInit } from "@angular/core";
import { Globals } from "../utils/Globals";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "my-activity",
  templateUrl: "./my-activity.component.html",
  styleUrls: ["./my-activity.component.css"]
})
export class MyActivity implements OnInit {
  private user_id: string;
  private messagesAmount: number;
  private gender: string;
  private age: number;
  private result: string;

  constructor(
    private globals: Globals,
    private messageService: MessageService
  ) {
    this.user_id = globals.connectedUser._id;
  }

  sendPrediction() {
    this.messageService.getPrediction(this.gender, this.age).subscribe(res => {
      if (res) {
        this.result = "Will probably give";
      } else {
        this.result = "Will probably take";
      }
    });
  }

  ngOnInit() {
    this.messageService.getItemsAmountByUser(this.user_id).subscribe(res => {
      this.messagesAmount = res.amount;
    });
  }
}
