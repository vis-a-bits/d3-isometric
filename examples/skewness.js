/*
    A visual representatio of an isometric axis
*/
var skewness = function() {
   var ret = function(selection) {
      selection.each(function() {
        var container = d3.select(this);

        //container.attr('transform', 'translate(24, 24)');

        //text: for some reason text is going outside the container
        container.append('text')
            .attr('class', 'axis-text')
            .attr('alignment-baseline',  'hanging')
            .attr('text-anchor', 'start')
            .attr('x', 0)
            .attr('y', 0)
            .text('skewX(30)')

        //skew x
        container.append('g')
            .call(function(parent) {
                parent.append('rect')
                    .attr('class', 'skew-shape')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 30)
                    .attr('height', 30)
                    .attr('transform', 'skewX(30)');

                parent.append('line')
                    .attr('class', 'axis-line')
                    .attr('x1', 0)
                    .attr('y1', 30)
                    .attr('x2', 40)
                    .attr('y2', 30)
                    .attr('marker-end', 'url(#arrow)')
                    .attr('transform', 'skewX(30)');
            });

        //text
        container.append('text')
            .attr('class', 'axis-text')
            .attr('alignment-baseline',  'hanging')
            .attr('text-anchor', 'start')
            .text('skewY(30)');

        container.append('g')
            .call(function(parent) {
                parent.append('rect')
                    .attr('class', 'skew-shape')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 30)
                    .attr('height', 30)
                    .attr('transform', 'skewY(30)');

                parent.append('line')
                    .attr('class', 'axis-line')
                    .attr('x1', 30)
                    .attr('y1', 0)
                    .attr('x2', 30)
                    .attr('y2', 40)
                    .attr('marker-end', 'url(#arrow)')
                    .attr('transform', 'skewY(30)');
            });

        d3.selectAll(this.childNodes).call(layout.vertical());
      });
    };
    
    return ret;
  }