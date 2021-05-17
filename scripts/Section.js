export class Section {
    constructor({items, renderer}, containerName){
        this.items = items;
        this.renderer = renderer;
        this.containerName = document.querySelector(containerName);
    }

    rendereItems(){
        this.items.map((item) => {
            this.addItem(this.renderer(item))
        })
      
    }

    addItem(elem, type = 'append'){
        if (type === 'append') {
            this.containerName.append(elem);
            return;
        }

        this.containerName.prepend(elem);
    }
}