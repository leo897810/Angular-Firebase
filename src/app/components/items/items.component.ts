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
  tempNewCategory : string = "";
  
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

  addCategories(){
    this.editedItem.categories.push(this.tempNewCategory);
    this.tempNewCategory = '';
  }

  deleteTempCategory(event, category) {
    // this.item.categories = this.item.categories.filter(function (val){
    //   return val !== category;
    // });
    for (var i = this.editedItem.categories.length - 1; i >= 0; i--) {
      if (this.editedItem.categories[i] === category) {
        this.editedItem.categories.splice(i, 1);
      }
    }
    console.log(this.editedItem.categories.length);
  }
}
