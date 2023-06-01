window.onload = function() {
  // alert("hello");
  grid = document.getElementById('pageGrid');
  slideItems = grid.children;
  slideNumber = slideItems.length;
  slideWidth = slideItems[0].clientWidth;
  console.log(slideWidth);
  next = document.getElementsByClassName('next-page');
  console.log(next);
  next[0].addEventListener("click", myFunction);

  function myFunction() {
    // alert("message");
    theThing = document.getElementById("pageGrid");
    theThing.style.left = -slideWidth + "px";
    page = document.getElementById("page1");
    page.width = slidewidth + "px";
  }
}
