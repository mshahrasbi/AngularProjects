import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddControlComponent } from './odd-control/odd-control.component';
import { EvenControlComponent } from './even-control/even-control.component';

@NgModule({
  declarations: [
    AppComponent,
    GameControlComponent,
    OddControlComponent,
    EvenControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
