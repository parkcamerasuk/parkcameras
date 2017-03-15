var acc = $(".accordion");
acc.addClass("inactive");

for (var i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("active");
    this.classList.toggle("inactive");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    }
    else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
