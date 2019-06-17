import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://www.bbcgoodfood.com/sites/default/files/categories/categories-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg'),
    new Recipe('Persian Recipe', 
      'This is a Persian Recipe',
      'https://www.recipetineats.com/wp-content/uploads/2018/08/Persian-Week-Feast-1.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
