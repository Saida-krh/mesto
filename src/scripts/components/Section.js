export class Section {
    constructor({items, renderer}, containerName){
        this._items = items;
        this._renderer = renderer;
        this._containerName = document.querySelector(containerName);
    }

    rendereItems(){
        this._items.map((item) => {
            this.addItem(item)
        })
      
    }

    addItem(item, type = 'append'){
        if (type === 'append') {
            this._containerName.append(this._renderer(item));
            return;
        }

        this._containerName.prepend(this._renderer(item));
    }
}