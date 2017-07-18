(function(){
  document.querySelector("#file-uploader")
    .addEventListener("change",function(ev){
      let files = ev.target.files;

      let image = files[0];

      let imageURL = URL.createObjectURL(image);

      document.querySelector(".profile .img")
        .style.backgroundImage = "url('"+ imageURL +"')";
    });

})()
