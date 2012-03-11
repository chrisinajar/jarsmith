var Window = function() {
};

Window.prototype.eval = eval;

Window.prototype.toString = function() {
  return 'test';
};

module.exports = Window;