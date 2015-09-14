
function bind(scope, fn) {
   return function() {
      return fn.apply(scope, arguments);
   }
}

var canvas = document.getElementById('playground');

var Drummer = new Drummer(canvas);


