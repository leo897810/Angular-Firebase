import { Component, OnInit } from '@angular/core';
import { ItemService} from '../../services/item.service';
import { Item } from '../../model/item';
import { fail } from 'assert';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items : Item[];
  editState : boolean = false;
  editedItem : Item;
  
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items =>{
        console.log(items);
        this.items = items;
    });
  }

  deleteItem(event, item){
    // console.log("items.component,deleteItem");
    this.clearState();
    this.itemService.deleteItem(item);
  }

  changeState(event, item: Item){
    this.editState = true;
    this.editedItem = item;
  }

  updateItem(){
    this.itemService.updateItem(this.editedItem);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.editedItem = null;
  }

}
