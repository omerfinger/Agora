import { Injectable } from "@angular/core";
import { Item, Kind, Category } from "src/app/models/item";
import { Message } from "src/app/models/message";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Http, Headers } from "@angular/http";

@Injectable({ providedIn: "root" })
export class MessageService {
  private messages: Message[];
  private messagesUpdate = new Subject<Message[]>();
  private serverApi = "http://localhost:3000/api/messages";

  constructor(private http: Http) {}

  getPrediction(gender, age) {
    var headers = new Headers();
    let URI = "http://localhost:3000/api/learning";
    headers.append("Content-type", "application/json");
    return this.http
      .post(URI, JSON.stringify({ gender, age }), { headers: headers })
      .pipe(map(res => res.json()));
  }

  getMessages() {
    let URI = `${this.serverApi}/liort`;
    var obs = this.http.get(URI).pipe(map(res => res.json()));
    obs.subscribe(res => {
      this.messages = res.messages;
    });
    return obs;
  }

  getMessagesByItem(item: Item) {
    let URI = `${this.serverApi}/${item._id}`;
    return this.http.get(URI).pipe(map(res => res.json()));
  }

  getMessagesByUser(userID: string) {
    let URI = `${this.serverApi}/byuser/${userID}`;
    return this.http.get(URI).pipe(map(res => res.json()));
  }

  getMessagesUpdatelistener() {
    return this.messagesUpdate.asObservable();
  }

  getItemsAmountByUser(user_id: string) {
    let URI = `${this.serverApi}/amount/${user_id}`;
    return this.http.get(URI).pipe(map(res => res.json()));
  }

  getAllMessages() {
    let URI = `${this.serverApi}/all/all`;
    return this.http.get(URI).pipe(map(res => res.json()));
  }

  createMessage(newMessage: Message) {
    var headers = new Headers();
    let URI = `${this.serverApi}`;
    headers.append("Content-type", "application/json");
    this.http
      .post(URI, JSON.stringify(newMessage), { headers: headers })
      .subscribe(
        data => {
          console.log(
            "POST Request to create message has been responded.",
            data
          );
        },
        error => {
          console.log("Error creating an message", error);
        }
      );
  }

  markAsRead(updMessage: Message) {
    var headers = new Headers();
    let URI = `${this.serverApi}/markAsRead/` + updMessage._id;
    headers.append("Content-type", "application/json");
    this.http
      .put(URI, JSON.stringify(updMessage), { headers: headers })
      .subscribe(
        data => {
          console.log("PUT Request marked message as read successfully.", data);
        },
        error => {
          console.log("Error updating message", error);
        }
      );
  }
}
