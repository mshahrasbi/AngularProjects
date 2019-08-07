
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';


export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
          'This is simply a test',
          'https://www.bbcgoodfood.com/sites/default/files/categories/categories-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg'),
        new Recipe('Persian Recipe', 
          'This is a Persian Recipe',
          'https://www.recipetineats.com/wp-content/uploads/2018/08/Persian-Week-Feast-1.jpg')
      ];

      getRecipes() {
          // here we call the sclie() on the recipes to give us a new array copy of the
          // recipes. So this way we only get the copy of the list and not the actual 
          // array.
          return this.recipes.slice();
      }
}