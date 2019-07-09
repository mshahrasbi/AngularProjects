import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-even-control',
  templateUrl: './even-control.component.html',
  styleUrls: ['./even-control.component.css']
})
export class EvenControlComponent implements OnInit {

  @Input() number: number;
  
  constructor() { }

  ngOnInit() {
  }

}
