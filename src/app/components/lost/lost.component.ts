import { Component } from '@angular/core';
import { Kind } from 'src/app/models/item';

@Component({
  selector: 'lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class Lost {
  scope_kind = Kind.Take;
}
