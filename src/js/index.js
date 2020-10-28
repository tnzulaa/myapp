require("@babel/polyfill"); // компайл хийж чадахгүй функц кодуудыг оруулдаг
import Search from './model/Search';


const controlSearch = async () => {
    const state = {};

// 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = 'pizza';
if(query){
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэнэ.
    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 4) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    console.log(state.search.result);
    
}

}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


