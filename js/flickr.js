$(document).ready(getPictures());
 
  function getPictures(){
      var apiKey='06982fbe26fb71ee728059ae0f253813';
   
      if (apiKey==''){alert('Necesita setear la clave de la api flickr antes de usar el servicio, para obtener una visite www.flikr.com');return false;}
      var url='http://www.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key='+apiKey+'&extras=url_o,url_s';
   
      var callback ='showPictures';
   
      jsonp(url,callback);
  }
   
  function jsonp(url,callback)  {
      scriptElement = document.createElement("SCRIPT");
      scriptElement.type = "text/javascript";
      scriptElement.src = url + "&jsoncallback="+callback;
      document.getElementsByTagName("HEAD")[0].appendChild(scriptElement);
  }
   
  function showPictures(pictures){
   
      var galery = $('#content ul');

      $.each(pictures.photos.photo,function(index,pic){
         var img= $('<img>');
         img.attr('src',pic.url_s);
         img.css('border','0');
         var link=$('<a>');
         link.attr('href',pic.url_o);
         link.html(img);
         galery.append(link);
     });
  }
}