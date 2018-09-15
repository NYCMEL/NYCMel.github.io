"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A breadcrumb component 
 * <BR><BR><img src=../img/breadcrumb.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/breadcrumb.html">DEMO</a>
 */
var Breadcrumb = function (_HTMLElement) {
  _inherits(Breadcrumb, _HTMLElement);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    console.group("Breadcrumb.constructor");

    var _this = _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).call(this));

    console.groupEnd();
    return _this;
  }

  _createClass(Breadcrumb, [{
    key: "connectedCallback",


    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    value: function connectedCallback() {
      console.group("Breadcrumb.connectedCallback");

      var self = this;

      // MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
      this.classList.add("wc");

      // FETCH ALL INTERESTING ELEMENTS
      this._fetchElements();

      // FETCH ALL ATTRIBUTES
      this._fetchAttributes();

      this.innerHTML = this.dom.content;

      // WRAP UP AND ADD STATS
      this._finalize();

      //SHOW IT NOW (NO FLICKERS) 
      this.style.visibility = "visible";

      console.groupEnd();
    }
  }, {
    key: "disconnectedCallback",


    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    value: function disconnectedCallback() {
      console.group("Breadcrumb.disconnectedCallback");

      /* CLEAN UP NOW */

      console.groupEnd();
    }
  }, {
    key: "attributeChangedCallback",


    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    value: function attributeChangedCallback(attr, oldval, newval) {
      console.group("Breadcrumb.attributeChangedCallback:", attr, oldval, newval);

      this.properties = this.properties || [];

      var obs = Maker.observedAttributes;

      for (var i = 0; i < obs.length; i++) {
        this.properties[obs[i]] = newval;
        console.log(obs[i] + ": " + this.properties.background);
        // YOUR CODE FOR CHANGES GO HERE 
      }

      console.groupEnd();
    }
  }, {
    key: "_fetchElements",


    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    value: function _fetchElements() {
      console.group("Breadcrumb._fetchElements");

      this.dom = {};
      this.dom.content = this.innerHTML;

      console.groupEnd();
    }
  }, {
    key: "_fetchAttributes",


    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [background=indianred] background color
     */
    value: function _fetchAttributes() {
      console.group("Breadcrumb._fetchAttributes");

      // SAVE WIDGET SPECIFIC PROPERTIES
      this.propertiesW = [];

      // SAVE ALL OTHER PROPERTIES
      var attrs = wc.getAttributes(this);

      for (var key in attrs) {
        this.properties[key] = this.getAttribute(key);
        this.propertiesW[key] = this.getAttribute(key);
        console.log(key + ": " + attrs[key]);
      }

      console.log("attributes: ", this.properties);

      // PROCESS ALL PROPERTIES (example below);
      // this.style.background = this.properties.background;

      console.groupEnd();
    }
  }, {
    key: "destroy",


    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    value: function destroy() {
      console.group("Message.destroy:", this.id);

      // FREE POINTER
      delete this;

      // REMOVE ITEM FROM DOM
      this.parentNode.removeChild(this);

      console.groupEnd();
    }
  }, {
    key: "_finalize",


    /**
     * SAVE DATA FOR ANALYTICS
     * @__finalize
     */
    value: function _finalize() {
      console.group("Breadcrumb._finalize:", this.id);

      this.classList.add("wc");

      // ADD ANALYTICS HERE
      wc.setStats(this, this.properties.cname, this.properties.version);

      console.groupEnd();
    }
  }], [{
    key: "test",


    /**
     * FOR TESTING PURPOSES
     * @test
     */
    value: function test() {
      console.group("Breadcrumb.test");

      console.log("testing results will be printed here...");

      console.groupEnd();
      return true;
    }
  }, {
    key: "observedAttributes",


    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    get: function get() {
      console.group("Breadcrumb.observedAttributes");

      this.observables = [];
      console.log(this.observables);

      console.groupEnd();
      return this.observables;
    }
  }]);

  return Breadcrumb;
}(HTMLElement);

window.customElements.define('wc-breadcrumb', Breadcrumb);