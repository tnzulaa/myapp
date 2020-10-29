import axios from 'axios';


export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        const result = await axios('https://forkify-api.herokuapp.com/api/get?rId=' + this.id);
        this.publisher = data.recipe.publisher;
        this.ingredients = data.recipe.ingredients;
        this.image_url = data.recipe.image_url;
        this.source_url = data.recipe.source_url;
        this.publisher_url = data.recipe.publisher_url;
        this.title = data.recipe.title;
        this.social_rank = data.recipe.social_rank;
        console.log(this.title);
        console.log( this.ingredients);
    }


}