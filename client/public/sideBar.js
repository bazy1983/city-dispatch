let options = {
  inDuration : 250,
  preventScrolling: true,
  draggable : true
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });
