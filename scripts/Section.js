export class Section {
    constructor({items, renderer}, containerName){
        this.items = items;
        this.renderer = renderer;
        this.containerName = document.querySelector(containerName);
    }

    rendereItems(){
        this.items.map((item) => {
            this.addItem(item)
        })
      
    }

    addItem(item, type = 'append'){
        if (type === 'append') {
            this.containerName.append(this.renderer(item));
            return;
        }

        this.containerName.prepend(this.renderer(item));
    }
}