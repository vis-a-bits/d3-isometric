var Transform = require('./transform');

var Projection = function() {
  var _transform = Transform(),
    x = 0,
    y = 0,
    z = 0,
    reverse = false,
    position = 'floor';

  var ret = function() {
    _transform.reset().translate(z, 0);

    if(position === 'floor') {
      _transform.rotate(-30).skewX(30);
    } else if(position === 'leftWall') {
      _transform.rotate(30).skewX(30);
    } else if(position === 'rightWall') {
      _transform.rotate(-30).skewX(-30);
    } else {
      throw 'Invalid property for position, options are: floow, leftWall, rightWall';
    }

    _transform.translate(x, y);

    return _transform();
  }

  ret.x = function(_) {
    if(!arguments.length) return x;
    x = _;
    return ret;
  }

  ret.y = function(_) {
    if(!arguments.length) return y;
    y = _;
    return ret;
  }

  ret.z = function(_) {
    if(arguments.length) return z;
    z = _;
    return ret;
  }

  ret.reverse = function(_) {
    if(!arguments.length) return reverse;
    reverse = _;
    return ret;
  }

  ret.position = function(_) {
    if(!arguments.length) return position;
    position = _;
    return ret;
  }

  return ret;
};


var FloorProjection = function() {
  return Projection().position('floor');
};

var LeftWallProjection = function() {
  return Projection().position('leftWall');
};

var RightWallProjection = function() {
  return Projection().position('rightWall');
};

module.exports = {
  Base: Projection,
  Floor: FloorProjection,
  LeftWall: LeftWallProjection,
  RightWall: RightWallProjection
};