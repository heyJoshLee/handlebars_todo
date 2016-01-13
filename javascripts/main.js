$(function(){
  var videos = [];
  var current_video = 0;

  var $video_container = $("#video_container");

  function Video(params) {
    this.title = params.title;
    this.url = params.url;
    this.comments = [];
    videos.push(this);
  }

  Video.prototype.source = function() {
    return "http://www.youtube.com/embed/" + this.url;
  }

  function Comment(user, body) {
    this.user = user;
    this.body = body;
  }


  new Video({title: "video 1", url: "Ut0SXRC0Kcw"});
  new Video({title: "video 2", url: "FlBuZbfDXOo"});
  new Video({title: "video 3", url: "9YZP5wZZY8E"});

  function updateVideo() {
    $("#video_container").html(templates.video({title: videos[current_video].title, source: videos[current_video].source()}));
  }

  $("#next_button").on("click", function(e) {
    e.preventDefault();
    current_video += 1;
    if (!videos[current_video]) { current_video = 0; }
    $("#video_container").fadeOut();
    updateVideo();
    $("#video_container").fadeIn();
  });

  $("#previous_button").on("click", function(e) {
    e.preventDefault();
    current_video -= 1;
    if (!videos[current_video]) { current_video = videos.length - 1; }
    $("#video_container").fadeOut();
    updateVideo();
    $("#video_container").fadeIn();
  });

  var templates = {};

  templates["video"] = Handlebars.compile($("#video_t").html());
  
  updateVideo();
  





  

  
  //Handlebars.compile($("[script*=x-handlebars-template"]).html());
  //Handlebars.registerPartial("name", $([script*=x-handlebars-partial"]).html());
  // $("div").html(template_function({key: value}));
});