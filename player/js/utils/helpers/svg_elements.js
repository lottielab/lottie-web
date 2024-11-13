import { svgNS } from '../../main';

var STYLE_PROPS = Object.freeze({
  transformOrigin: 'transform-origin',
  webkitTransformOrigin: '-webkit-transform-origin',
  mozTransformOrigin: '-moz-transform-origin',
  backfaceVisibility: 'backface-visibility',
  webkitBackfaceVisibility: '-webkit-backface-visibility',
  transformStyle: 'transform-style',
  webkitTransformStyle: '-webkit-transform-style',
  mozTransformStyle: '-moz-transform-style',
  contentVisibility: 'content-visibility',
  fontSize: 'font-size',
  webkitTransform: '-webkit-transform',
  mozTransform: '-moz-transform',
  backgroundColor: 'background-color',
  transformStyle: 'transform-style',
  webkitTransformStyle: '-webkit-transform-style',
  mozTransformStyle: '-moz-transform-style',
  webkitPerspective: '-webkit-perspective',
  fontVariant: 'font-variant',
  fontStyle: 'font-style',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  letterSpacing: 'letter-spacing',
})

function VirtualElement(tag) {
  this.tag = tag;
  this.children = null;
  this.attrs = null;
  this.element = null;
}

VirtualElement.prototype.setAttribute = function(name, value) {
  if (this.element) {
    this.element.setAttribute(name, value);
    return;
  }

  if (!this.attrs) {
    this.attrs = {};
  }
  this.attrs[name] = value;
};

VirtualElement.prototype.setAttributeNS = function(namespace, name, value) {
  if (this.element) {
    this.element.setAttributeNS(namespace, name, value);
    return;
  }

  this.setAttribute(name, value);
}

VirtualElement.prototype.getAttribute = function(name) {
  if (this.element) {
    return this.element.getAttribute(name);
  }
  return this.attrs ? this.attrs[name] : undefined;
};

VirtualElement.prototype.getAttributeNS = function(namespace, name) {
  if (this.element) {
    return this.element.getAttributeNS(namespace, name);
  }
  return this.getAttribute(name);
}

Object.defineProperty(VirtualElement.prototype, 'style', {
  get: function() {
    if (this.element) {
      return this.element.style;
    }

    if (!this.attrs) {
      this.attrs = {};
    }
    if (!this.attrs.style) {
      this.attrs.style = {};
    }
    return this.attrs.style;
  },
  set: function(value) {
    if (this.element) {
      this.element.style = value;
      return;
    }
    if (!this.attrs) {
      this.attrs = {};
    }
    this.attrs.style = value;
  }
});

VirtualElement.prototype.appendChild = function(child) {
  if (this.element) {
    this.element.appendChild(child.element);
    return child;
  }

  if (!this.children) {
    this.children = [];
  }
  this.children.push(child);
  child.parent = this;
  return child;
};

VirtualElement.prototype.removeChild = function(child) {
  if (this.element) {
    this.element.removeChild(child.element);
    return;
  }

  if (!this.children) {
    return;
  }
  var idx = this.children.indexOf(child);
  if (idx !== -1) {
    this.children.splice(idx, 1);
  }
};

VirtualElement.prototype.insertBefore = function(child, before) {
  if (this.element) {
    this.element.insertBefore(child.element, before.element);
    return;
  }

  if (!this.children) {
    this.children = [];
  }
  var idx = this.children.indexOf(before);
  if (idx !== -1) {
    this.children.splice(idx, 0, child);
  }
};

VirtualElement.prototype.reify = function() {
  if (this.element) {
    return this.element;
  }

  var tag = this.tag;
  var element = document.createElementNS(svgNS, tag);
  if (this.attrs) {
    for (var name in this.attrs) {
      if (name === 'style') {
        var style = this.attrs[name];
        for (var prop in style) {
          element.style[prop] = style[prop];
        }
      } else {
        element.setAttribute(name, this.attrs[name]);
      }
    }
  }

  if (this.children) {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i] = this.children[i].reify();
    }

    for (var i = 0; i < this.children.length; i++) {
      element.appendChild(this.children[i]);
    }
  }

  this.element = element;
  this.attrs = null;
  this.children = null;

  return this.element;
};

VirtualElement.prototype.reifyInto = function(root) {
  //var sRes = {s: ''};
  //this.disappointingSerialize(sRes);
  //root.innerHTML = sRes.s;
  root.innerHTML = this.badSerialize();
  this._postReifyInto(root.firstChild);
};

VirtualElement.prototype._postReifyInto = function(root) {
  if (!root) {
    throw new Error('Could not find element');
  }

  this.element = root;

  if (this.children) {
    var curr = root.firstChild;
    for (var i = 0; i < this.children.length; i++) {
      this.children[i]._postReifyInto(curr);
      curr = curr.nextSibling;
    }
  }

  this.attrs = null;
  this.children = null;
};

VirtualElement.prototype.badSerialize = function() {
  var str = '<' + this.tag;

  const attrs = this.attrs;
  if (attrs) {
    for (var name in attrs) {
      if (name != 'style') {
        str += ' ' + name + '="' + attrs[name] + '"';
      } else {
        str += ' style="';
        const st = attrs.style;
        for (var prop in st) {
          var propName = STYLE_PROPS[prop] || prop;
          str += propName + ':' + st[prop] + ';';
        }
        str += '"';
      }
    }
  }

  str += '>';
  const children = this.children;
  if (children) {
    for (var i = 0; i < children.length; i++) {
      str += children[i].badSerialize();
    }
  }

  str += '</' + this.tag + '>';
  return str;
};

VirtualElement.prototype.wastefulSerialize = function() {
  var str = '<' + this.tag;
  if (this.attrs) {
    for (var name in this.attrs) {
      if (name != 'style') {
        str += ' ' + name + '="' + this.attrs[name] + '"';
      } else {
        let styleStr = '';
        for (var prop in this.attrs.style) {
          var propName = STYLE_PROPS[prop] || prop;
          styleStr += propName + ':' + this.attrs.style[prop] + ';';
        }

        str += ' style="' + styleStr + '"';
      }
    }
  }

  str += '>';

  let childStr = '';
  if (this.children) {
    for (var i = 0; i < this.children.length; i++) {
      childStr += this.children[i].wastefulSerialize(str);
    }
  }

  str += childStr + '</' + this.tag + '>';
  return str;
};


VirtualElement.prototype.disappointingSerialize = function(sRes) {
  sRes.s += '<';
  sRes.s += this.tag;
  if (this.attrs) {
    for (var name in this.attrs) {
      if (name != 'style') {
        sRes.s += ' ';
        sRes.s += name;
        sRes.s += '="'
        sRes.s += this.attrs[name];
        sRes.s += '"';
      } else {
        sRes.s += ' style="';
        for (var prop in this.attrs.style) {
          var propName = STYLE_PROPS[prop] || prop;
          sRes.s += propName;
          sRes.s += ':';
          sRes.s += this.attrs.style[prop];
          sRes.s += ';';
        }
        sRes.s += '"';
      }
    }
  }

  sRes.s += '>';
  if (this.children) {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].disappointingSerialize(sRes);
    }
  }

  sRes.s += '</';
  sRes.s += this.tag;
  sRes.s += '>';
};


function createNS(type) {
  // return {appendChild:function(){},setAttribute:function(){},style:{}}
  //return document.createElementNS(svgNS, type);
  return new VirtualElement(type);
}

export default createNS;
