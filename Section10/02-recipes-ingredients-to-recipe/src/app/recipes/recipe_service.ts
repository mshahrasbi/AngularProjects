
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping.list.service';


@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
          'This is simply a test',
          'https://www.bbcgoodfood.com/sites/default/files/categories/categories-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),
        new Recipe('Persian Recipe', 
          'This is a Persian Recipe',
          'https://www.recipetineats.com/wp-content/uploads/2018/08/Persian-Week-Feast-1.jpg',
          [
            new Ingredient('Rice', 1),
            new Ingredient('Meat', 20),
            new Ingredient('Bread', 2)
          ])
      ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
      // here we call the sclie() on the recipes to give us a new array copy of the
      // recipes. So this way we only get the copy of the list and not the actual 
      // array.
      return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}