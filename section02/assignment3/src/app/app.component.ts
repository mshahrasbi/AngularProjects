import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styles: [
  //   `
  //   h3 { color: red; }
  //   `
  // ]
})
export class AppComponent {
  title = 'basics-components';
  displaySecretPassword = false;
  log = [];

  displaySecret() {
    return this.displaySecretPassword;
  }

  onToggleDetails() {
    this.displaySecretPassword = !this.displaySecretPassword;

    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }
}
