import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../model/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    title: '',
    description: '',
    url: '',
    categories: []
  };

  addFlag:boolean = false;

  tempCategory: string = '';

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit() {
    
    if (this.item.title != '' && this.item.description != '') {
      this.itemService.addItem(this.item);
    }
  }

  addCategories() {
    this.item.categories.push(this.tempCategory);
    this.tempCategory = '';
    // console.log(this.item.categories);
    // console.log(this.item.categories.length);
  }

  deleteTempCategory(evetn, category) {
    // this.item.categories = this.item.categories.filter(function (val){
    //   return val !== category;
    // });
    for (var i = this.item.categories.length - 1; i >= 0; i--) {
      if (this.item.categories[i] === category) {
        this.item.categories.splice(i, 1);
      }
    }
    console.log(this.item.categories.length);
  }

}
