

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        ],
    imports: [
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ShoppingListModule {}