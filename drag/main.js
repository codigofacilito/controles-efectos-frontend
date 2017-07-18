class DOMHelper{
  static move(el,coords){
    el.style.top = (coords.y - (el.clientHeight / 2)) + "px";
    el.style.left = (coords.x - (el.clientWidth / 2)) + "px";
  }

  static isOver(el,pointerCoords){
    let elCoords = el.getBoundingClientRect();

    if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
      if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
        return true;
      }
    }

    return false;
  }

  static whereIs(el,pointerCoords){
    let elCoords = el.getBoundingClientRect();

    if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
      if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
        if(pointerCoords.y > elCoords.top + (elCoords.height / 2)) return 1;
        return 2;

      }
    }

    return -1;
  }
}

class DragList{
  constructor(list_selector, items_selector="li"){
    this.list = document.querySelector(list_selector);
    this.items = this.list.querySelectorAll(items_selector);
    this.finalPosition = -1;
    this.finalElementHover = null;

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);

    this.canvas = document.createElement("canvas");
    this.buildFakeElement();
    this.bindEvents();
  }

  buildFakeElement(){
    this.fakeElement = document.createElement("div");
    this.fakeElement.style.background = "#eee";
    this.fakeElement.classList.add("card");
  }

  bindEvents(){
    this.items.forEach(item =>{
      item.addEventListener("dragstart",this.handleDragStart);
      item.addEventListener("drag",this.handleDrag);
      item.addEventListener("dragend",this.handleDragEnd);
    })
  }

  handleDragStart(ev){
    let el = ev.currentTarget;
    ev.dataTransfer.setDragImage(this.canvas,0,0);
    el.classList.add("dragging");
  }

  handleDrag(ev){
    let mouseCoords = {x: ev.clientX, y: ev.clientY};
    DOMHelper.move(ev.currentTarget,mouseCoords);

    if(DOMHelper.isOver(this.list,mouseCoords)){
      this.items.forEach(item => this.compareElement(item,ev));
    }else{
      this.fakeElement.remove();
    }
  }

  compareElement(item,ev){
    if(item == ev.currentTarget) return;
    let mouseCoords = {x: ev.clientX, y: ev.clientY};
    let result = DOMHelper.whereIs(item,mouseCoords)
    if(result == -1) return;

    this.finalPosition = result;
    this.finalElementHover = item;

    if(result == 1)
      this.list.insertBefore(this.fakeElement,item.nextSibling);
    if(result == 2)
      this.list.insertBefore(this.fakeElement,item);
  }

  handleDragEnd(ev){
    let el = ev.currentTarget;
    el.classList.remove("dragging");
    el.style.top = "";
    el.style.left = "";


    if(this.finalPosition == 1)
      this.list.insertBefore(el,this.finalElementHover.nextSibling);
    if(this.finalPosition == 2)
      this.list.insertBefore(el,this.finalElementHover);


  }

}


(function(){
  new DragList("ul");
})();
