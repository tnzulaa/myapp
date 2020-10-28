require("@babel/polyfill"); // компайл хийж чадахгүй функц кодуудыг оруулдаг
import Search from './model/Search';
import { elements } from './view/base';
import * as searchView from './view/searchView';


const controlSearch = async () => {
    const state = {};

// 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();
if(query){
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 4) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    
    searchView.renderRecipes(state.search.result);
    
}

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


