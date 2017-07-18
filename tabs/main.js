class IndexForSiblings{
  static get(el){
    let children = el.parentNode.children;

    for (var i = 0; i < children.length; i++) {
      let child = children[i];
      if(child == el) return i;
    }
  }
}

class TabsManager{
  constructor(selector_tabs, controls_selector, indicator_selector){
    this.tabs = document.querySelector(selector_tabs);
    this.controls = document.querySelectorAll(controls_selector);
    this.indicator = document.querySelector(indicator_selector);
    this.handleClick = this.handleClick.bind(this);
    this.setIndicatorWidth();
    this.bindEvents();
  }

  setIndicatorWidth(){
    this.indicator.style.width = this.controls[0].clientWidth + "px";
  }

  bindEvents(){
    this.controls.forEach(button =>{
      button.addEventListener("click",this.handleClick)
    })
  }

  handleClick(ev){
    ev.preventDefault();

    let button = ev.currentTarget;

    let position = IndexForSiblings.get(button);

    this.indicator.style.left = (position * this.indicator.clientWidth)+"px";

    this.openTab(button.hash);
  }

  openTab(hash){
    let tab = document.querySelector(hash);

    let position = IndexForSiblings.get(tab);

    this.tabs.querySelector(".container").style.left = -(position * 100)+"%";

  }
}


new TabsManager(".tabs",".tabs-control a",".indicator");
