$(function(){
  function Video(url) {
    this.url = url;
  }

  Video.prototype.source = function() {
    return "https://www.youtube.com/watch?v=" + this.url
  }
  //Handlebars.compile($("[script*=x-handlebars-template"]).html());
  //Handlebars.registerPartial("name", $([script*=x-handlebars-partial"]).html());
  // $("div").html(template_function({key: value}));
});