const likeTemplate = `
  <svg width="70" height="60" viewBox="0 0 70 60" class="heart">
    <path d="M0 10 L10 10 L10 0 L30 0 L30 10 L40 10 L40 0 L60 0 L60 10 L70 10 L70 30 L60 30 L60 40 L50 40 L50 50 L40 50 L40 60 L30 60 L30 50 L20 50 L20 40 L10 40 L10 30 L0 30 Z" fill="#EC613C" fill-rule="evenodd" />
  </svg>
  `;
class LikeMe{
  constructor(selector){
    this.el = document.querySelector(selector);
    this.el.style.position = "relative";

    this.bindEvents();
  }

  bindEvents(){
    this.el.addEventListener("dblclick",(ev)=>{
      this.buildHeart();
      this.el.appendChild(this.heart);
    })
  }

  buildHeart(){
    this.heart = document.createElement("div");
    this.heart.style.position = "absolute";
    this.heart.style.top = "40%";
    this.heart.style.left = "40%";
    this.heart.innerHTML = likeTemplate;
  }

}
(function(){

  new LikeMe(".card");

})();
