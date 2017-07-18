class InputMD{
  constructor(selector){
    this.input = document.querySelector(selector);
    this.bindEvents();
  }

  bindEvents(){
    this.input.addEventListener("keyup",()=>{
      if(this.input.value == "") return this.input.classList.remove("non-empty");

      this.input.classList.add("non-empty")
    })
  }
}

(function(){
  new InputMD(".input-form input")
})()
