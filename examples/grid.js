var grid = function() {
  var blockSize = 10,
    width = 100, 
    height = 100,
    z = 0;

  var ret = function(selection) {
    var dataColumns = new Array(Math.round(width/blockSize)),
      dataRows = new Array(Math.round(height/blockSize));

    selection.each(function() {
      var selectionColumns = d3.select(this).selectAll('.column')
        .data(dataColumns);

      var selectionRows = d3.select(this).selectAll('.rows')
        .data(dataRows)
        .enter()
        .append('line')
        .attr('class', 'grid-row')
        .attr('x1', function(d, i){ return (i/dataRows.length)*height; })
        .attr('x2', function(d, i){ return (i/dataRows.length)*height; })
        .attr('y1', 0)
        .attr('y2', width)
        .attr('transform', d3.isometric.projection.Floor().z(z)());

      var selectionColumns = d3.select(this).selectAll('.columns')
        .data(dataColumns)
        .enter()
        .append('line')
        .attr('class', 'grid-column')
        .attr('y1', function(d, i){ return (i/dataRows.length)*width; })
        .attr('y2', function(d, i){ return (i/dataRows.length)*width; })
        .attr('x1', 0)
        .attr('x2', height)
        .attr('transform', d3.isometric.projection.Floor().z(z)());
    });
  };

  ret.blockSize = function(_) {
    if(!arguments.length) return blockSize;
    blockSize = _;
    return ret;
  };

  ret.width = function(_) {
    if(!arguments.length) return width;
    width = _;
    return ret;
  };

  ret.height = function(_) {
    if(!arguments.length) return height;
    height = _;
    return ret;
  };

  ret.z = function(_) {
    if(!arguments.length) return z;
    z = _;
    return ret;
  };

  return ret;
}