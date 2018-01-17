import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Order } from '../model/order';

@Injectable()
export class OrderService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;

  constructor(public afs: AngularFirestore) {
    this.ordersCollection = this.afs.collection<Order>('orders', ref => ref.orderBy('time'));
    this.orders = this.ordersCollection.snapshotChanges().map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return {id,...data};
      });
    });
  }

  getOrders(){
    return this.orders;
  }

  addOrder(newOrder: Order){
    this.ordersCollection.add(newOrder);
  }
}
