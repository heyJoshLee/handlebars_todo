$(function(){
  var videos = [],
      current_video = 0,
      $video_container = $("#video_container");

  // Set up Handlebars templates
  var templates = {};
    templates["video"] = Handlebars.compile($("#video_t").html());
    templates["form"] = Handlebars.compile($("#form_t").html());
    templates["comments"] = Handlebars.compile($("#comments_t").html());
    Handlebars.registerPartial("comment", $("#comment_p").html());

  function Video(params) {
    this.title = params.title;
    this.url = params.url;
    this.comments = [];
    videos.push(this);
  }

  Video.prototype.source = function() { return "http://www.youtube.com/embed/" + this.url; }

  function Comment(params) {
    this.user = params.user;
    this.body = params.body;
  }

  function updateVideo() {
    $("#video_container").html(templates.video({title: videos[current_video].title, source: videos[current_video].source()}));
  }

  function updateForm() {
    $("#form_container").html(templates.form({video_id: current_video}));
  }

  function updateComments() {
    $("#comments_container").html(templates.comments({comments: videos[current_video].comments}));
  }

  function submitComment() {
    var vid_id = $("input#id_form").val(),
        user = $("#user_form").val(),
        body = $("textarea").val();
    
    videos[vid_id].comments.push(new Comment({user: user, body: body}));
    $("#user_form").val("");
    $("textarea").val("");  
}

function loadVideo(move_direction) {
      updateVideo();
      updateForm();
      updateComments();
  }

  function loadInitalData() {
    updateVideo();
    updateForm();
    updateComments();
  }

  // Event handlers
  $("#next_button").on("click", function(e) {
    e.preventDefault();
    current_video += 1;
    if (!videos[current_video]) { current_video = 0; }
    loadVideo("left");
  });

  $("#previous_button").on("click", function(e) {
    e.preventDefault();
    current_video -= 1;
    if (!videos[current_video]) { current_video = videos.length - 1; }
    loadVideo("right");
  });

  $("#form_container").on("submit", "form", function(e) {
    e.preventDefault();
    submitComment();
    updateComments();
  });

  $("#video_form").on("submit", function(e) {
    e.preventDefault();
    var video_title = $("#video_title").val();
    var video_url = $("#video_url").val();
    new Video({title: video_title, url: video_url});
    $("#video_title").val("");
    $("#video_url").val("");
  });
  
  // Create sample data
  new Video({title: "video 1", url: "Ut0SXRC0Kcw"});
  new Video({title: "video 2", url: "FlBuZbfDXOo"});
  new Video({title: "video 3", url: "9YZP5wZZY8E"});
  videos[0].comments.push(new Comment({user: "user name", body: "here is some info" }));
  videos[0].comments.push(new Comment({user: "josh", body: "Awesome video" }));

  loadInitalData();


  //Handlebars.compile($("[script*=x-handlebars-template"]).html());
  //Handlebars.registerPartial("name", $([script*=x-handlebars-partial"]).html());
  // $("div").html(template_function({key: value}));
});