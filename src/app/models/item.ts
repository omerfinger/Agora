import { UserModel } from "./user";
import { ItemLocation } from "./location";

export class Item {
  _id: string;
  name: string;
  description: string;
  kind: Kind;
  category: Category;
  color: string;
  create_time: Date;
  location: ItemLocation;
  username: string;
}

export enum Category {
  Glasses = "Glasses",
  Phones = "Phones",
  Laptops = "Laptops",
  Wallets = "Wallets",
  Documents = "Documents"
}

export enum Kind {
  Take = "Take",
  Give = "Give"
}
