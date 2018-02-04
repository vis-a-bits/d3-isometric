/*
    A visual representatio of an isometric axis
*/
var rotation = function() {
  var r = 30,
    a = (30 * Math.PI) / 180;

  var ret = function(selection) {
    selection.each(function() {
        var container = d3.select(this);

        //container.attr('transform', 'translate(24, 200)');

        //text
        container.append('text')
          .attr('class', 'axis-text')
          .attr('alignment-baseline',  'hanging')
          .attr('text-anchor', 'start')
          .attr('x', 0)
          .attr('y', 0)
          .text('rotate(30)');

        //circle and angle path
        container.append('g')
            .call(function(parent) {
                parent.append('circle')
                    .attr('class', 'rotation-circle')
                    .attr('cx', r)
                    .attr('cy', r)
                    .attr('r', r);

                parent.append('path')
                    .attr('class', 'rotation-circle-arrow')
                    .attr('d', 'M ax,ay L cx,cy L x1,y1 A cx,cy 0 0 0 ax ay'
                        .replace(/x1/g, r*2)
                        .replace(/y1/g, r)
                        .replace(/cx/g, r)
                        .replace(/cy/g, r)
                        .replace(/ax/g, r + r*Math.cos(a))
                        .replace(/ay/g, r - r*Math.sin(a))
                    )
                    .attr('marker-end', 'url(#arrow)');
            });

        d3.selectAll(this.childNodes).call(layout.vertical());
  });
};

return ret;
}