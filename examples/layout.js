var layout = {
    vertical: function() {
        var _spacing = 8,
            _offsetX = 0,
            _offsetY = 0;
        
        var ret =  function(selection) {
            var y = _offsetY;
            selection.each(function() {
                var bbox = this.getBBox();

                d3.select(this)
                    .attr('transform', 'translate(x, y)'
                        .replace('y', y - bbox.y/* todo: how to calculate new value with bbox.y */)
                        .replace('x', _offsetX)
                    );
    
                y += (bbox.height + _spacing);
            });
        };

        ret.spacing = function(_) {
            if(!arguments.length) return _spacing;
            _spacing = _;
            return ret;
        }

        ret.offsetX = function(_) {
            if(!arguments.length) return _offsetX;
            _offsetX = _;
            return ret;
        }

        ret.offsetY = function(_) {
            if(!arguments.length) return _offsetY;
            _offsetY = _;
            return ret;
        }

        return ret;
    },
    horizontal: function() {
        var _spacing = 8,
            _offsetX = 0,
            _offsetY = 0;
        
        var ret =  function(selection) {
            var x = _offsetX;

            selection.each(function() {
                var bbox = this.getBBox();
    
                d3.select(this)
                    .attr('transform', 'translate(x, y)'.replace('x', x).replace('y', _offsetY));
    
                x += (bbox.width + _spacing);
            });
        };

        ret.spacing = function(_) {
            if(!arguments.length) return _spacing;
            _spacing = _;
            return ret;
        }

        ret.offsetX = function(_) {
            if(!arguments.length) return _offsetX;
            _offsetX = _;
            return ret;
        }

        ret.offsetY = function(_) {
            if(!arguments.length) return _offsetY;
            _offsetY = _;
            return ret;
        }

        return ret;
    },
};