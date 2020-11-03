import uniqid from 'uniqid';

export default class List{
    
    constructor(){
        this.item = [];
       
    } 

    addItem(item){
        let newItem = {
            item,
            id: uniqid()
        }
        this.item.push(newItem);

        return newItem;
    }

    deleteItem(id){
        // id гэсэн ID-тай орцын индексийг массиваас хайж олно.
        const index = this.item.findIndex( el => el.id === id);

        // Уг индекс дээрх элементийг массиваас устгана.
        this.item.splice(index, 1);
    }
}