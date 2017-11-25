/**
 * A handy way of generating svg's transform attribute
 */
var Transform = function() {
  /*
    A transformation is an array [a, b, c, d, e, f],
    representing the following matrix:
        a  c  e
      [ b  d  f ]
        0  0  1
  */
  var _transformation = [1, 0, 0, 1, 0, 0],
      _radDegreesConstant = Math.PI/180
    ;

  /*
    Applies the given transformation
        result        current
       a  c  e       a'  c'  e'
     [ b  d  f ] * [ b'  d'  f' ] * ....
       0  0  1       0   0   1
  */
  var pushTransform = function(newTransform) {
    _transformation = [
      _transformation[0]*newTransform[0] + _transformation[2]*newTransform[1],
      _transformation[1]*newTransform[0] + _transformation[3]*newTransform[1],
      _transformation[0]*newTransform[2] + _transformation[2]*newTransform[3],
      _transformation[1]*newTransform[2] + _transformation[3]*newTransform[3],
      _transformation[0]*newTransform[4] + _transformation[2]*newTransform[5] + _transformation[4]*1,
      _transformation[1]*newTransform[4] + _transformation[3]*newTransform[5] + _transformation[5]*1
    ];
  }

  var ret = function() {
    var transform = _transformation;
    return 'matrix(' +
              transform[0] + ',' +
              transform[1] + ',' +
              transform[2] + ',' +
              transform[3] + ',' +
              transform[4] + ',' +
              transform[5] +
            ')';
  }

  ret.rotate = function(degrees, x, y) {
    if(arguments.length > 1) ret.translate(x, y);

    pushTransform([
        Math.cos(degrees*_radDegreesConstant),
        Math.sin(degrees*_radDegreesConstant),
        -1*Math.sin(degrees*_radDegreesConstant),
        Math.cos(degrees*_radDegreesConstant),
        0,
        0]);

    if(arguments.length > 1) ret.translate(-x, -y);
    return ret;
  }

  ret.scale = function(x, y) {
    pushTransform([x, 0, 0, x, 0, 0]);
    return ret;
  }

  ret.translate = function(x, y) {
    pushTransform([1, 0, 0, 1, x, y]);
    return ret;
  }

  ret.skewX = function(x) {
    pushTransform([1, 0, Math.tan(x*_radDegreesConstant), 1, 0, 0]);
    return ret;
  }

  ret.skewY = function(y) {
    pushTransform([1, Math.tan(y*_radDegreesConstant), 0, 1, 0, 0]);
    return ret;
  }

  ret.reset = function() {
    _transformation = [1, 0, 0, 1, 0, 0];
    return ret;
  }

  return ret;
}

module.exports = Transform;