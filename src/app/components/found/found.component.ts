import { Component } from "@angular/core";
import { Kind } from "src/app/models/item";
import { WebsocketService } from "src/app/services/WebSockets.service";

@Component({
  selector: "found",
  templateUrl: "./found.component.html",
  styleUrls: ["./found.component.css"]
})
export class Found {
  scope_kind = Kind.Give;
}
