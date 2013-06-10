//<<<<< obj vector
function Vector(in_x, in_y) {
    this.x = in_x;
    this.y = in_y;
};

Vector.prototype = {

    Set: function(in_vector) {
        this.x = in_vector.x;
        this.y = in_vector.y;
    },

    magnitude: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalize: function() {
        var mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    },

    toString: function() {
        return this.x + "," + this.y;
    },

    transform: function(in_scale, in_translation) {
        return new Vector(this.x * in_scale.x + in_translation.x, this.y * in_scale.y + in_translation.y);
    },

    clone: function() {
        return new Vector(this.x, this.y);
    },

    Add: function(a) {
        this.x += a.x;
        this.y += a.y;
    },

    Subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y;
    },

    equals: function(a) {
        return this.x == a.x && this.y == a.y;
    },
};

Vector.Dot = function(a, b) {
    return a.x * b.x + a.y * b.y;
}

Vector.Pointwise = function(a, b) {
    return new Vector(a.x * b.x, a.y * b.y);
}

Vector.SquareDistance = function(a, b) {
    var diff_x = a.x - b.x;
    var diff_y = a.y - b.y;
    return diff_x * diff_x + diff_y * diff_y;
}

Vector.Distance = function(a, b) {

    return Math.sqrt(Vector.SquareDistance(a, b));
}

Vector.Subtract = function(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
}

Vector.Add = function(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
}

parseVector = function(in_string) {
    var strings = in_string.split(',');
    var x = parseFloat(strings[0]);
    var y = parseFloat(strings[1]);
    return new Vector(x, y);
}

Vector.Multiply = function(f, v) {
    return new Vector(v.x * f, v.y * f);
}

Vector.Equals = function(a, b) {
    return a.x == b.x && a.y == b.y;
}