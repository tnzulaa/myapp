require("@babel/polyfill"); // компайл хийж чадахгүй функц кодуудыг оруулдаг
import Search from './model/Search';

let search = new Search('pasta');
search.doSearch().then(r => console.log(r));
