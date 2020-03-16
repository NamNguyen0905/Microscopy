$(function() {
  $("img").on("click", function() {
    //Store slide name when click on the image
    let slide_name = $(this).attr("id");

    localStorage.setItem("slide", slide_name);
  });
});
