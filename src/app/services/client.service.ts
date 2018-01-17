import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Client } from '../model/client';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  clietDoc: AngularFirestoreDocument<Client>;
  newClient: Observable<Client>;



  constructor(public afs:AngularFirestore) {
    this.clientsCollection = this.afs.collection<Client>('clients');
    this.clients = this.clientsCollection.snapshotChanges().map(
      actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id,...data};
      })
    });
  }

  getClients(){
    return this.clients;
  }

  addClient(cilent:Client){
    this.clientsCollection.add(cilent);
  }

}
