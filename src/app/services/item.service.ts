import { Injectable } from '@angular/core';
import { Item, Kind, Category } from 'src/app/models/item'
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers } from '@angular/http';

@Injectable({providedIn: 'root'})

export class ItemService {
    private items: Item[];

      private itemsUpdate = new Subject<Item[]>();
      private serverApi = 'http://localhost:3000/api';

      constructor(private http: Http) { }
    
    getItems(){
        let URI = `${this.serverApi}/items`;
        var obs = this.http.get(URI).pipe(map(res => res.json()));
        obs.subscribe(res => { this.items = res.items });
        return obs;
    }

    getItemsByKind(kind: Kind){
        let URI = `${this.serverApi}/items`;
        var obs = this.http.get(URI).pipe(map(res => res.json()));
        obs.subscribe(res => { this.items = res.items.filter(
            item => item.kind == kind);
            this.itemsUpdate.next([...this.items]);
         });
        return obs;
    }

    getItemsByUser(user_id: string){
        let URI = `${this.serverApi}/items/byUser/${user_id}`;
        var obs = this.http.get(URI).pipe(map(res => res.json()));
        obs.subscribe(res => { this.items = res.items });
        return obs;
    }

    getItemsUpdatelistener() {
        return this.itemsUpdate.asObservable();
    }

    searchItems(sname: string, skind: Kind, scategory: Category,stime: Date){
        let URI = `${this.serverApi}/items/search/${sname}-${skind}-${scategory}-${stime}`;
        var obs = this.http.get(URI).pipe(map(res => res.json()));
        obs.subscribe(res => { 
            this.items = res.items
            this.itemsUpdate.next([...this.items]);
        });
        
    }

    createItem(newItem:Item){
        var headers = new Headers();
        let URI = `${this.serverApi}/items`;
        headers.append('Content-type', 'application/json');
        this.http.post(URI, JSON.stringify(newItem),{ headers: headers }).subscribe(
            data  => {
            console.log("POST Request created item successfully.", data);
            this.items.push(data.json().item);
            this.itemsUpdate.next([...this.items]);
            },
            error  => {
            
            console.log("Error creating an item", error);
            
            }
            
            );
    }

    updateItem(updItem:Item){
        var headers = new Headers();
        let URI = `${this.serverApi}/items/`+updItem._id;
        headers.append('Content-type', 'application/json');
        this.http.put(URI, JSON.stringify(updItem),{ headers: headers }).subscribe(
            data  => {
            console.log("PUT Request updated item successfully.", data);
            },
            error  => {
            
            console.log("Error creating an item", error);
            
            }
            
            );
    }

    deleteItem(delItem:Item){
        let URI = `${this.serverApi}/items/`+delItem._id;
        this.http.delete(URI).subscribe(
            data  => {
            console.log("POST Request created item successfully.", data);
            
            // Update list
            var index = this.items.find((item) => {
                if(item._id == delItem._id) {
                    return true;
                }
            });
            this.items.splice(this.items.indexOf(index), 1);
            this.itemsUpdate.next([...this.items]);

            },
            error  => {
            
            console.log("Error creating an item", error);
            
            }
            
            );
    }

    getItemsByCategoryPieChart() {
        let URI = `${this.serverApi}/items/itemsByCategory`;
        return this.http.get(URI).pipe(map(res => 
            res.json()));
    }
}