export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLikes(id, title, publisher, img){
        const like = {id, title, publisher, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        // id гэсэн ID-тай Like-г индексийг массиваас хайж олно.
        const index = this.likes.findIndex( el => el.id === id);

        // Уг индекс дээрх элементийг массиваас устгана.
        this.likes.splice(index, 1);
    }

    isLiked(id){
        // if( this.likes.findIndex(el => el.id === id) === -1)
        // return false;
        // else return true;

        return this.likes.findIndex(el => el.id === id) !== -1

    }

    getNumberOfLikes(){
        return this.likes.length;
    }

}
