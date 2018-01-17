import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemService } from './services/item.service';
import { OrderService } from './services/order.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent,
    AddItemComponent,
    HomeComponent,
    OrdersComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path:'items', component: ItemsComponent},
      {path:'orders', component: OrdersComponent},
      {path:'clients', component: ClientsComponent},
      {path:'home', component: HomeComponent},
      {path:'', redirectTo:'home',pathMatch:'full'},
      {path:'**', redirectTo:'home',pathMatch:'full'}
    ])
  ],
  providers: [ItemService, OrderService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
