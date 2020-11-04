require("@babel/polyfill"); // компайл хийж чадахгүй функц кодуудыг оруулдаг
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from './view/recipeView';
import List from './model/List';
import Like from './model/Like';
import * as likesView from './view/likesView';
import * as listView from './view/listView';


/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлагууд
 */
const state = {};

const controlSearch = async () => {
    

// 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();
if(query){
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 4) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if(state.search.result === undefined) alert("Хайлт илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
    
    
}

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if(btn){
        const gotoPageNumber =parseInt(btn.dataset.goto);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }

});

/**
 * Жорын контроллер
 */

const controlRecipe = async () => {
    // 1) URL-ээс ID-г салгаж авна
    const id = window.location.hash.replace('#','');
    if(!state.likes) state.likes = new Like();
    // URL дээр ID олдвол 
    if(id){
    // 2) Жорын модулийг үүсгэж өгнө.
    state.recipe = new Recipe(id);
    // 3) UI дэлгэцийг бэлтгэнэ
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    // 4) Жорыг татаж авчирна
    await state.recipe.getRecipe();
    // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6) Жороо дэлгэцэнд гаргана
    clearLoader();
    renderRecipe(state.recipe, state.likes.isLiked(id));
    }
    
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach( e => window.addEventListener(e, controlRecipe));

/**
 * Найрлаганы контроллер
 */

 const controlList = () => {
     // Найрлаганы моделийг үүсгэнэ
     state.list = new List(state.recipe);

     // Өмнө байсан найрлагыг дэлгэцээс зайлуулна.
     listView.clearItems();

     // Уг моделруу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ
     state.recipe.ingredients.forEach( n => {
         // Тухайн найрлагыг модель руу хийнэ
        const item =  state.list.addItem(n);

         // Тухайн найрлагыг дэлгэцэнд гаргана         
         listView.renderItem(item);
     })

    // state.list.forEach( el => listView.renderItem(el));

    

 };

 /**
  * Like контроллер
  */

  const controlLike = () => {
      // 1) Like-н моделийг үүсгэнэ.
     if(!state.likes) state.likes = new Like();

      // 2) Одоо харагдаж байгаа жорын ID-г олж авах
        const currentRecipeId = state.recipe.id;
      // 3) Энэ жорыг лайкласан эсэхийг шалгах
      if(state.likes.isLiked(currentRecipeId)){
          // 4) Лайкласан бол лайкийг нь болиулна.
          state.likes.deleteLike(currentRecipeId);
          likesView.toggleLikeBtn(false);
         
      } else {
          // 5) Лайклаагүй бол лайкална.
          state.likes.addLikes(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url );
          likesView.toggleLikeBtn(true);
          

      }
     
      
    
      

  };

 elements.shoppingList.addEventListener('click', e => {
     const id = e.target.closest('.shopping__item').dataset.itemid;
    // Олдсон ID-тай орцыг моделиос устгана
    state.list.deleteItem(id);

    // Дээрх ID-тай орцыг дэлгэцээс устгана
    listView.deleteItem(id);
 });

 elements.recipeDiv.addEventListener('click', e => {
    if(e.target.matches('.recipe__btn, .recipe__btn *'))    
    controlList();
    else {
        if(e.target.matches('.recipe__love, .recipe__love *'))
        controlLike();
    }
        
 }
 );
