/*
//-- Responsive adjustment for DOM view
*/
window.addEventListener("resize", myFunction);

function myFunction() {
    var h = window.innerHeight;
    // alert('Window height = ' + h);
    var h_obj = h - 140;
    document.getElementById("editor").style.height = h_obj + 'px';
    document.getElementById("view-wrapper").style.height = h_obj + 'px';
}
