import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-servers', // Select as element
  // selector: '[app-servers]', // select as attribute
  selector: '.app-servers', // as style class
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
