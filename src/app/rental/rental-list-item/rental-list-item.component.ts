import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.scss']
})

export class RentalListItemComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
