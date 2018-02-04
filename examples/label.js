/*
    A visual representatio of an isometric axis
*/
var label = function() {
  var _width = 100;


  var ret = function(selection) {
    selection.each(function(data) {
      var container = d3.select(this);

      container.append('text')
          .attr('class', 'label-text')
          .text(data);

      container.append('line')
          .attr('class', 'label-line')
          .attr('x1', 0)
          .attr('x2', _width)
          .attr('y1', 5)
          .attr('y2', 5);
    });
  };

  ret.width = function(_) {
    if(!arguments.length) return _width;
    _width = _;
    return ret;
  }

  return ret;
}