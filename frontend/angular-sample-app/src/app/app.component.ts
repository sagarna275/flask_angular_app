import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular + Flask Hello</h1>
    <input [(ngModel)]="newItem" placeholder="Enter item name" />
    <button (click)="addItem()">Add</button>
    <ul>
      <li *ngFor="let item of items">{{ item.name }}</li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  items: any[] = [];
  newItem = '';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    if (!this.newItem) return;
    this.itemService.addItem(this.newItem).subscribe(() => {
      this.newItem = '';
      this.loadItems();
    });
  }
}

