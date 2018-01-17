import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order.service';
import { Client } from '../../model/client';
import { ClientService } from '../../services/client.service';
import { Contact } from '../../model/contact';
import { Item } from '../../model/item';
import { ItemService } from '../../services/item.service';
import { SelectedItem } from '../../model/selectedItem';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  showOrder: boolean = false;
  selectedOrder: Order;
  amount: number = 0;
  
  clients: Client[];
  selectedClient:Client;
  selectedContact: Contact;

  selectedItem: SelectedItem;

  selectedItems: SelectedItem[] = [];

  selectedItemTitle:string;
  selectedItemPrice:number;
  selectedItemQuantity:number;

  items: Item[];
  // nameofNewOrderClient: string='';
  
  //
  // fakeArray = new Array(1);

  //when newOrder is true show add new button otherwise show add order form
  newOrderFlag: boolean = true;

  newOrder: Order;

  constructor(public orderService: OrderService,
              public clientService: ClientService,
              public itemService: ItemService,
              private resolver:ComponentFactoryResolver) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders =>{
      console.log(orders);
      this.orders = orders;
    });

    // this.selectedItems.push(this.selectedItem);
    // console.log("selectedItems: " + this.selectedItems.length);
    // console.log("title: " + this.selectedItems[0].title);
  }

  //Show or high details of order
  changeState(event, order){
    this.showOrder = true;
    this.selectedOrder = order;
    this.totalPrice(order);
  }

  clearState(){
    this.showOrder = false;
    this.selectedOrder = null;
    this.amount = 0;
  }

  totalPrice(order){
    // totalPrice: num = 0;
    // console.log("amount: here");
    let item = order.items;
    // console.log("amount: here + " + order.items[0].price);
    // console.log("amount: here + " + order.items.legnth);
    for( var i in item){
      // console.log(order.items[i]);
      this.amount += item[i].price* item[i].quantity;
    }
    this.amount += order.postage*35;
  }

  // when newOrderFlag = false, then show the add new order form
  changeNewOrderFlag(){
    this.newOrderFlag = false;
    this.getClient();
  }

  getClient(){
    this.clientService.getClients().subscribe(clients =>{
      this.clients = clients;
      // console.log(clients);
    });
  }

  // selectClient(cilent){
  //   console.log("this.selectedClient: " + this.selectedClient.name);
  //   console.log("cilent: " + cilent);
    
  // }

  loadItems(){
    this.itemService.getItems().subscribe(items =>{
      this.items = items;
      console.log("all items: " + this.items);
    });
  //   for(var i = 0; i <= this.items.length; i++){
  //     console.log(i+": " + this.items[i].title);
  //  }
  }

  

  addItem(){
    let a :SelectedItem ={
      title: this.selectedItemTitle, 
      price: this.selectedItemPrice, 
      quantity: this.selectedItemQuantity
    };

    this.selectedItems.push(a);
    this.selectedItemTitle = null;
    this.selectedItemPrice = null;
    this.selectedItemQuantity = null;
    
    this.totalPriceForSeletedItems();
  }
  
  total:number =0;
  //calculate the taotal price of seleted items
  totalPriceForSeletedItems(){
    this.total = 0;
    for(var i=0; i<= this.selectedItems.length;i++){
      this.total += this.selectedItems[i].price * this.selectedItems[i].quantity;
    }
  }

  deletSelectedItem(event, i){
    console.log("delete: " + i);
    // this.selectedItems.filter(item =>
    //   item != selectedItem
    // );
    this.selectedItems.splice(i,1);
    this. totalPriceForSeletedItems();
    console.log("selectedItems: " + this.selectedItems.length);
  }

  submitNewOrder(){
    // client?:string; 00
    // items?:any[]; 00
    // postage?: number;
    // shippingCompany?: string;
    // shippingCompanyUrl?: string;
    // trackingNum?: string;
    
    this.newOrder ={
      client: this.selectedClient.name,
      items: this.selectedItems,
      postage: 0,
      recipient: this.selectedContact,
      shippingCompany: '',
      shippingCompanyUrl: '',
      trackingNum: '',
      status: "not paid",
      time: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.orderService.addOrder(this.newOrder);
  }
}