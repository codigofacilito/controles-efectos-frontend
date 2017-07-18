(function(){
  let pinged = false;
  let nav = document.querySelector(".nav");
  let coords = nav.getBoundingClientRect();
  let stickyScrollPoint = coords.top;

  function pingToTop(){
    if(pinged) return;

    nav.classList.add("pined");

    pinged = true;
  }

  function unPingFromTop(){
    console.log(pinged);
    if(!pinged) return;

    nav.classList.remove("pined");

    pinged = false;
  }

  window.addEventListener('scroll',function(ev){
    if(window.scrollY < stickyScrollPoint) return unPingFromTop();
    let coords = nav.getBoundingClientRect();
    if(coords.top <= 0) return pingToTop();

    unPingFromTop();
  })

})();
