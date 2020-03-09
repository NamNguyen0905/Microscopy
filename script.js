$(function() {
  $("img").on("click", function() {
    //Store slide name when click on the image
    let slide_name = $(this).attr("id");
    console.log(slide_name);

    localStorage.setItem("slide", slide_name);
  });
});
