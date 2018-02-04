/*
    A visual representatio of an isometric axis
*/
var axis = function() {
   var ret = function(selection) {
      selection.each(function() {
        var container = d3.select(this);

         //text
         container.append('text')
            .attr('class', 'axis-text')
            .attr('alignment-baseline',  'hanging')
            .attr('text-anchor', 'start')
            .attr('x', 0)
            .attr('y', 0)
            .text('XZY Axis');

        //x axis
        container.append('g')
            .call(function(parent) {
                parent.append('line')
                    .attr('class', 'axis-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 40)
                    .attr('y2', 0)
                    .attr('marker-end', 'url(#arrow)')
                    .attr('transform', d3.isometric.projection.X().z(10));

                parent.append('text')
                    .attr('class', 'axis-text')
                    .attr('x', 60)
                    .attr('y', 0)
                    .attr('transform', d3.isometric.projection.X().z(10))
                    .text('x')

                //y axis
                parent.append('line')
                    .attr('class', 'axis-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 40)
                    .attr('y2', 0)
                    .attr('marker-end', 'url(#arrow)')
                    .attr('transform', d3.isometric.projection.Y().z(10));

                parent.append('text')
                    .attr('class', 'axis-text')
                    .attr('x', 60)
                    .attr('y', 0)
                    .attr('transform', d3.isometric.projection.Y().z(10))
                    .text('y');

                //z axis
                parent.append('line')
                    .attr('class', 'axis-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', 40)
                    .attr('transform', d3.isometric.projection.Z().z(10))
                    .attr('marker-end', 'url(#arrow)');

                parent.append('text')
                    .attr('class', 'axis-text')
                    .attr('x', 0)
                    .attr('y', 65)
                    .attr('transform', d3.isometric.projection.Z().z(10))
                    .text('z')
            });

            d3.selectAll(this.childNodes).call(layout.vertical());
        });
    };
    
    return ret;
  }