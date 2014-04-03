/*!
 * minQuery
 */

var miniQuery = (function() {
  var miniQuery = function(css_selector) {
    return new QueryToolbelt(css_selector);
  };
  miniQuery.ajax = function(options) {
     miniQuery.ajaxWrapper.request(options);
  }
  return (window.miniQuery = window.$ = miniQuery)
}());

function QueryToolbelt(query) {
  this.query = query;
}

QueryToolbelt.prototype = {
  hide: function() {
    miniQuery.DOM.hide(this.query);
  },
  show: function() {
    miniQuery.DOM.show(this.query);
  },
  addClass: function(name) {
    miniQuery.DOM.addClass(this.query, name);
  },
  removeClass: function(name) {
    miniQuery.DOM.removeClass(this.query, name);
  },
  on: function(name, func) {
    miniQuery.eventDispatcher.on(this.query, name, func);
  },
  trigger: function(name) {
    miniQuery.eventDispatcher.trigger(this.query, name);
  }
}

miniQuery.sweetSelector = {
  select: function(css_selector) {
    var type = css_selector.substr(0, 1);
    var selector = css_selector.substr(1, css_selector.length - 1);
    if (type == "#") {
      return document.getElementById(selector);
    }
    else if (type == ".") {
      return document.getElementsByClassName(selector);
    }
    else {
      return document.getElementsByTagName(css_selector);
    }
  }
};

miniQuery.iterator = {
  select_iterate: function(css_selector, func, params) {
    var elements = miniQuery.sweetSelector.select(css_selector);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        func.call(elements[i], params);
      }
    } else {
      func.call(elements, params);
    }
  }
};

miniQuery.DOM = {
  hide: function(css_selector) {
    miniQuery.iterator.select_iterate(css_selector, this.setDisplay, 'none');
  },
  show: function(css_selector) {
    miniQuery.iterator.select_iterate(css_selector, this.setDisplay, '');
  },

  addClass: function(css_selector, className) {
    miniQuery.iterator.select_iterate(css_selector, this.appendClass, className)
  },

  removeClass: function(css_selector, className) {
    miniQuery.iterator.select_iterate(css_selector, this.deleteClass, className)
  },

  setDisplay: function(display) {
    this.style.display = display;
  },

  appendClass: function(className) {
    this.className += ' ' + className;
  },

  deleteClass: function(className) {
    this.className = this.className.replace(className, '');
  }
};

miniQuery.eventDispatcher = {
  on: function(css_selector, name, callback) {
    miniQuery.iterator.select_iterate(css_selector, this.addListener, [name, callback]);
  },
  trigger: function(css_selector, name){
    var event = new Event(name);
    miniQuery.iterator.select_iterate(css_selector, this.dispatch, event);
  },
  addListener: function(params) {
    var name = params[0]
    var func = params[1]
    this.addEventListener(name, func)
  },
  dispatch: function(event) {
    this.dispatchEvent(event);
  }
};

miniQuery.ajaxWrapper = {
  request: function(options) {
    var url = options.url,
        type = options.type,
        success = options.success,
        fail = options.fail;

    var request = new XMLHttpRequest();
    request.open(type, url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        success(request);
      } else {
        fail(request);
      }
    };
    request.onerror = fail;
    request.send();
  }
};
