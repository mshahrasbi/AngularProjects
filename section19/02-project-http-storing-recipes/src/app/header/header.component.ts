import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageServoce: DataStorageService) {}

  onSaveData() {
    console.log('[HeaderComponent] onSaveData: ');
    this.dataStorageServoce.storeRecipes();
  }

}
