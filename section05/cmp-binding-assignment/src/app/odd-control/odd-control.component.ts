import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd-control',
  templateUrl: './odd-control.component.html',
  styleUrls: ['./odd-control.component.css']
})
export class OddControlComponent implements OnInit {

  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}
