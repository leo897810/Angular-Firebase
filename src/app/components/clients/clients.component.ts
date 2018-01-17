import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  newContact: Contact ={
    name:'',
    phone: 0,
    address: '',
    id: 0
  }
  newClient: Client = {
    name: ' ',
    wechat: ' ',
    contacts: [this.newContact]
  };

  editState: boolean = false;
  editClient: Client;
  

  currentContact: number = 0;
  
  // @ViewChild('selectElem') cl:ElementRef;
  // @ViewChild('appendElem') app:ElementRef;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe( clients =>{
      this.clients = clients;
      console.log(clients);
    })
  }

  onSubmit(){
    if( this.newClient.name != '' && this.newClient.wechat != ''&&
        this.newClient.contacts.length > 0){
      this.clientService.addClient(this.newClient);
    }
  }

  changeState(event, client){
    this.editState = true;
    this.editClient = client;
  }

  clearState(){
    this.editState = false;
  }
}
