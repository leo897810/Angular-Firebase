import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../model/item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  newItem : Observable<Item>;

  constructor(public afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));
    // this.items = this.itemsCollection.valueChanges();
    this.items =  this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a=>{
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id,...data};
      });
    });
  }

  getItems(){
    return this.items;
  }

  addItem(item : Item){
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item){
    // console.log("items.service,deleteItem");
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    // console.log("final step");
    this.itemDoc.delete();
  }

  updateItem(item: Item){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.update(item);
  }

}

