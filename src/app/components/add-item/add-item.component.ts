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
  item : Item = {
    title: '',
    description: ''
  };
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit(){
    if( this.item.title != '' && this.item.description != ''){
        this.itemService.addItem(this.item);
    }
  }

}
