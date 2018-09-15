/////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-08-26 10:08:40 (melify)>
/////////////////////////////////////////////////////////////////////
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
	define([], factory(root));
    } else if ( typeof exports === 'object' ) {
	module.exports = factory(root);
    } else {
	root.wc = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {
    'use strict';

    if (typeof wcENV === 'undefined') {var wcENV = 'dev'}
    if (typeof wcAPP === 'undefined') {var wcAPP = 'NOT-SET'}
    if (typeof wcURL === 'undefined') {var wcURL = 'http://localhost/tk/lib/components/w'}

    // Object for public APIs
    var wc = {};
    window.wc = wc;

    //
    // Methods
    //

    wc.hide = function (sel) {
	wc.hideElements(wc.getElements(sel));
    };

    wc.hideElements = function (elements) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {
	    wc.hideElement(elements[i]);
	}
    };

    wc.hideElement = function (element) {
	wc.styleElement(element, "display", "none");
    };

    wc.show = function (sel, a) {
	var elements = wc.getElements(sel);
	if (a) {wc.hideElements(elements);}
	wc.showElements(elements);
    };

    wc.showElements = function (elements) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {
	    wc.showElement(elements[i]);
	}
    };

    wc.showElement = function (element) {
	wc.styleElement(element, "display", "block");
    };

    wc.addStyle = function (sel, prop, val) {
	wc.styleElements(wc.getElements(sel), prop, val);
    };

    wc.styleElements = function (elements, prop, val) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {    
	    wc.styleElement(elements[i], prop, val);
	}
    };

    wc.styleElement = function (element, prop, val) {
	element.style.setProperty(prop, val);
    };

    wc.toggleShow = function (sel) {
	var i, x = wc.getElements(sel), l = x.length;
	for (i = 0; i < l; i++) {    
	    if (x[i].style.display == "none") {
		wc.styleElement(x[i], "display", "block");
	    } else {
		wc.styleElement(x[i], "display", "none");
	    }
	}
    };

    wc.addClass = function (sel, name) {
	wc.addClassElements(wc.getElements(sel), name);
    };

    wc.addClassElements = function (elements, name) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {
	    wc.addClassElement(elements[i], name);
	}
    };

    wc.addClassElement = function (element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
	    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
	}
    };

    wc.removeClass = function (sel, name) {
	wc.removeClassElements(wc.getElements(sel), name);
    };

    wc.removeClassElements = function (elements, name) {
	var i, l = elements.length, arr1, arr2, j;
	for (i = 0; i < l; i++) {
	    wc.removeClassElement(elements[i], name);
	}
    };

    wc.removeClassElement = function (element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
	    while (arr1.indexOf(arr2[i]) > -1) {
		arr1.splice(arr1.indexOf(arr2[i]), 1);     
	    }
	}
	element.className = arr1.join(" ");
    };

    wc.toggleClass = function (sel, c1, c2) {
	wc.toggleClassElements(wc.getElements(sel), c1, c2);
    };

    wc.toggleClassElements = function (elements, c1, c2) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {    
	    wc.toggleClassElement(elements[i], c1, c2);
	}
    };

    wc.toggleClassElement = function (element, c1, c2) {
	var t1, t2, t1Arr, t2Arr, j, arr, allPresent;
	t1 = (c1 || "");
	t2 = (c2 || "");
	t1Arr = t1.split(" ");
	t2Arr = t2.split(" ");
	arr = element.className.split(" ");
	if (t2Arr.length == 0) {
	    allPresent = true;
	    for (j = 0; j < t1Arr.length; j++) {
		if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
	    }
	    if (allPresent) {
		wc.removeClassElement(element, t1);
	    } else {
		wc.addClassElement(element, t1);
	    }
	} else {
	    allPresent = true;
	    for (j = 0; j < t1Arr.length; j++) {
		if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
	    }
	    if (allPresent) {
		wc.removeClassElement(element, t1);
		wc.addClassElement(element, t2);          
	    } else {
		wc.removeClassElement(element, t2);        
		wc.addClassElement(element, t1);
	    }
	}
    };

    wc.getElements = function (id) {
	if (typeof id == "object") {
	    return [id];
	} else {
	    return document.querySelectorAll(id);
	}
    };

    wc.filterHTML = function(id, sel, filter) {
	var a, b, c, i, ii, iii, hit;
	a = wc.getElements(id);
	for (i = 0; i < a.length; i++) {
	    b = wc.getElements(sel);
	    for (ii = 0; ii < b.length; ii++) {
		hit = 0;
		if (b[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
		    hit = 1;
		}
		c = b[ii].getElementsByTagName("*");
		for (iii = 0; iii < c.length; iii++) {
		    if (c[iii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
			hit = 1;
		    }
		}
		if (hit == 1) {
		    b[ii].style.display = "";
		} else {
		    b[ii].style.display = "none";
		}
	    }
	}
    };

    wc.sortHTML = function(id, sel, sortvalue) {
	var a, b, i, ii, y, bytt, v1, v2, cc, j;
	a = wc.getElements(id);
	for (i = 0; i < a.length; i++) {
	    for (j = 0; j < 2; j++) {
		cc = 0;
		y = 1;
		while (y == 1) {
		    y = 0;
		    b = a[i].querySelectorAll(sel);
		    for (ii = 0; ii < (b.length - 1); ii++) {
			bytt = 0;
			if (sortvalue) {
			    v1 = b[ii].querySelector(sortvalue).innerHTML.toLowerCase();
			    v2 = b[ii + 1].querySelector(sortvalue).innerHTML.toLowerCase();
			} else {
			    v1 = b[ii].innerHTML.toLowerCase();
			    v2 = b[ii + 1].innerHTML.toLowerCase();
			}
			if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
			    bytt = 1;
			    break;
			}
		    }
		    if (bytt == 1) {
			b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
			y = 1;
			cc++;
		    }
		}
		if (cc > 0) {break;}
	    }
	}
    };

    wc.slideshow = function (sel, ms, func) {
	var i, ss, x = wc.getElements(sel), l = x.length;
	ss = {};
	ss.current = 1;
	ss.x = x;
	ss.ondisplaychange = func;
	if (!isNaN(ms) || ms == 0) {
	    ss.milliseconds = ms;
	} else {
	    ss.milliseconds = 1000;
	}

	ss.start = function() {
	    ss.display(ss.current)
	    if (ss.ondisplaychange) {ss.ondisplaychange();}
	    if (ss.milliseconds > 0) {
		window.clearTimeout(ss.timeout);
		ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
	    }
	};

	ss.next = function() {
	    ss.current += 1;
	    if (ss.current > ss.x.length) {ss.current = 1;}
	    ss.start();
	};

	ss.previous = function() {
	    ss.current -= 1;
	    if (ss.current < 1) {ss.current = ss.x.length;}
	    ss.start();
	};

	ss.display = function (n) {
	    wc.styleElements(ss.x, "display", "none");
	    wc.styleElement(ss.x[n - 1], "display", "block");
	}
	ss.start();
	return ss;
    };

    wc.include = function(cb) {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
	    elmnt = z[i];
	    file = elmnt.getAttribute("wc-include");
	    if (file) {
		xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4) {
			if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			elmnt.removeAttribute("wc-include");
			wc.include(cb);
		    }
		}      
		xhttp.open("GET", file, true);
		xhttp.send();
		return;
	    }
	}
	if (cb) cb();
    };

    wc.getHttpData = function (file, func) {
	wc.http(file, function () {
	    if (this.readyState == 4 && this.status == 200) {
		func(this.responseText);
	    }
	});
    };

    wc.getHttpObject = function (file, func) {
	wc.http(file, function () {
	    if (this.readyState == 4 && this.status == 200) {
		func(JSON.parse(this.responseText));
	    }
	});
    };

    wc.displayHttp = function (id, file) {
	wc.http(file, function () {
	    if (this.readyState == 4 && this.status == 200) {
		wc.displayObject(id, JSON.parse(this.responseText));
	    }
	});
    };

    wc.http = function (target, readyfunc, xml, method) {
	var httpObj;
	if (!method) {method = "GET"; }
	if (window.XMLHttpRequest) {
	    httpObj = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	    httpObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (httpObj) {
	    if (readyfunc) {httpObj.onreadystatechange = readyfunc;}
	    httpObj.open(method, target, true);
	    httpObj.send(xml);
	}
    };

    wc.getElementsByAttribute = function (x, att) {
	var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
	l = y.length;
	for (i = -1; i < l; i += 1) {
	    if (i == -1) {y[i] = x;}
	    if (y[i].getAttribute(z) !== null) {arrCount += 1; arr[arrCount] = y[i];}
	}
	return arr;
    };  
    wc.dataObject = {},

    wc.displayObject = function (id, data) {
	var htmlObj, htmlTemplate, html, arr = [], a, l, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";
	htmlObj = document.getElementById(id);
	htmlTemplate = init_template(id, htmlObj);
	html = htmlTemplate.cloneNode(true);
	arr = wc.getElementsByAttribute(html, "wc-repeat");
	l = arr.length;
	for (j = (l - 1); j >= 0; j -= 1) {
	    cc = arr[j].getAttribute("wc-repeat").split(" ");
	    if (cc.length == 1) {
		repeat = cc[0];
	    } else {
		repeatX = cc[0];
		repeat = cc[2];
	    }
	    arr[j].removeAttribute("wc-repeat");
	    repeatObj = data[repeat];
	    if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
		i = 0;
		for (x in repeatObj) {
		    i += 1;
		    rowClone = arr[j];
		    rowClone = wc_replace_curly(rowClone, "element", repeatX, repeatObj[x]);
		    a = rowClone.attributes;
		    for (ii = 0; ii < a.length; ii += 1) {
			a[ii].value = wc_replace_curly(a[ii], "attribute", repeatX, repeatObj[x]).value;
		    }
		    (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) : arr[j].parentNode.insertBefore(rowClone, arr[j]);
		}
	    } else {
		console.log("wc-repeat must be an array. " + repeat + " is not an array.");
		continue;
	    }
	}
	html = wc_replace_curly(html, "element");
	htmlObj.parentNode.replaceChild(html, htmlObj);
	function init_template(id, obj) {
	    var template;
	    template = obj.cloneNode(true);
	    if (wc.dataObject.hasOwnProperty(id)) {return wc.dataObject[id];}
	    wc.dataObject[id] = template;
	    return template;
	}
	function wc_replace_curly(elmnt, typ, repeatX, x) {
	    var value, rowClone, pos1, pos2, originalHTML, lookFor, lookForARR = [], i, cc, r;
	    rowClone = elmnt.cloneNode(true);
	    pos1 = 0;
	    while (pos1 > -1) {
		originalHTML = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
		pos1 = originalHTML.indexOf("{{", pos1);
		if (pos1 === -1) {break;}
		pos2 = originalHTML.indexOf("}}", pos1 + 1);
		lookFor = originalHTML.substring(pos1 + 2, pos2);
		lookForARR = lookFor.split("||");
		value = undefined;
		for (i = 0; i < lookForARR.length; i += 1) {
		    lookForARR[i] = lookForARR[i].replace(/^\s+|\s+$/gm, ''); //trim
		    if (x) {value = x[lookForARR[i]];}
		    if (value == undefined && data) {value = data[lookForARR[i]];}
		    if (value == undefined) {
			cc = lookForARR[i].split(".");
			if (cc[0] == repeatX) {value = x[cc[1]]; }
		    }
		    if (value == undefined) {
			if (lookForARR[i] == repeatX) {value = x;}
		    }
		    if (value == undefined) {
			if (lookForARR[i].substr(0, 1) == '"') {
			    value = lookForARR[i].replace(/"/g, "");
			} else if (lookForARR[i].substr(0,1) == "'") {
			    value = lookForARR[i].replace(/'/g, "");
			}
		    }
		    if (value != undefined) {break;}
		}
		if (value != undefined) {
		    r = "{{" + lookFor + "}}";
		    if (typ == "attribute") {
			rowClone.value = rowClone.value.replace(r, value);
		    } else {
			wc_replace_html(rowClone, r, value);
		    }
		}
		pos1 = pos1 + 1;
	    }
	    return rowClone;
	}
	function wc_replace_html(a, r, result) {
	    var b, l, i, a, x, j;
	    if (a.hasAttributes()) {
		b = a.attributes;
		l = b.length;
		for (i = 0; i < l; i += 1) {
		    if (b[i].value.indexOf(r) > -1) {b[i].value = b[i].value.replace(r, result);}
		}
	    }
	    x = a.getElementsByTagName("*");
	    l = x.length;
	    a.innerHTML = a.innerHTML.replace(r, result);
	}
    };

    wc.ready = function ( fn ) {
	// Sanity check
	if ( typeof fn  !== 'function' ) return;

	// If document is already loaded, run method
	if ( document.readyState === 'complete'  ) {
	    return fn();
	}

	// Otherwise, wait until document is loaded
	document.addEventListener( 'DOMContentLoaded', fn, false );

    };

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists.
     * @author Todd Motto
     * @link   https://github.com/toddmotto/foreach
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function}              callback   Callback function for each iteration
     * @param {Array|Object|NodeList} scope      Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    wc.forEach = function ( collection, callback, scope ) {
	if ( Object.prototype.toString.call( collection ) === '[object Object]' ) {
	    for ( var prop in collection ) {
		if ( Object.prototype.hasOwnProperty.call( collection, prop ) ) {
		    callback.call( scope, collection[prop], prop, collection );
		}
	    }
	} else {
	    for ( var i = 0, len = collection.length; i < len; i++ ) {
		callback.call( scope, collection[i], i, collection );
	    }
	}
    };

    /**
     * Get the height of an element.
     * @param  {Node} elem The element to get the height of
     * @return {Number}    The element's height in pixels
     */
    wc.getHeight = function ( elem ) {
	return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
    };

    /**
     * Get an element's distance from the top of the Document.
     * @param  {Node} elem The element
     * @return {Number}    Distance from the top in pixels
     */
    wc.getOffsetTop = function ( elem ) {
	var location = 0;
	if (elem.offsetParent) {
	    do {
		location += elem.offsetTop;
		elem = elem.offsetParent;
	    } while (elem);
	}
	return location >= 0 ? location : 0;
    };

    /**
     * Get the closest matching element up the DOM tree.
     * @param  {Element} elem     Starting element
     * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
     * @return {Boolean|Element}  Returns null if not match found
     */
    wc.getClosest = function ( elem, selector ) {
	// Variables
	var firstChar = selector.charAt(0);
	var supports = 'classList' in document.documentElement;
	var attribute, value;

	// If selector is a data attribute, split attribute from value
	if ( firstChar === '[' ) {
	    selector = selector.substr(1, selector.length - 2);
	    attribute = selector.split( '=' );

	    if ( attribute.length > 1 ) {
		value = true;
		attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
	    }
	}

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

	    // If selector is a class
	    if ( firstChar === '.' ) {
		if ( supports ) {
		    if ( elem.classList.contains( selector.substr(1) ) ) {
			return elem;
		    }
		} else {
		    if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
			return elem;
		    }
		}
	    }

	    // If selector is an ID
	    if ( firstChar === '#' ) {
		if ( elem.id === selector.substr(1) ) {
		    return elem;
		}
	    }

	    // If selector is a data attribute
	    if ( firstChar === '[' ) {
		if ( elem.hasAttribute( attribute[0] ) ) {
		    if ( value ) {
			if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
			    return elem;
			}
		    } else {
			return elem;
		    }
		}
	    }

	    // If selector is a tag
	    if ( elem.tagName.toLowerCase() === selector ) {
		return elem;
	    }

	}

	return null;

    };

    /**
     * Get an element's parents.
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against (class, ID, data attribute, or tag)
     * @return {Array}           An array of matching nodes
     */
    wc.getParents = function ( elem, selector ) {
	// Variables
	var parents = [];
	var supports = 'classList' in document.documentElement;
	var firstChar, attribute, value;

	// If selector is a data attribute, split attribute from value
	if ( selector ) {
	    firstChar = selector.charAt(0);
	    if ( firstChar === '[' ) {
		selector = selector.substr(1, selector.length - 2);
		attribute = selector.split( '=' );

		if ( attribute.length > 1 ) {
		    value = true;
		    attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
		}
	    }
	}

	// Get matches
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
	    if ( selector ) {

		// If selector is a class
		if ( firstChar === '.' ) {
		    if ( supports ) {
			if ( elem.classList.contains( selector.substr(1) ) ) {
			    parents.push( elem );
			}
		    } else {
			if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
			    parents.push( elem );
			}
		    }
		}

		// If selector is an ID
		if ( firstChar === '#' ) {
		    if ( elem.id === selector.substr(1) ) {
			parents.push( elem );
		    }
		}

		// If selector is a data attribute
		if ( firstChar === '[' ) {
		    if ( elem.hasAttribute( attribute[0] ) ) {
			if ( value ) {
			    if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
				parents.push( elem );
			    }
			} else {
			    parents.push( elem );
			}
		    }
		}

		// If selector is a tag
		if ( elem.tagName.toLowerCase() === selector ) {
		    parents.push( elem );
		}

	    } else {
		parents.push( elem );
	    }

	}

	// Return parents if any exist
	if ( parents.length === 0 ) {
	    return null;
	} else {
	    return parents;
	}

    };

    /**
     * Get an element's siblings.
     * @param  {Node} elem The element
     * @return {Array}     An array of sibling nodes
     */
    wc.getSiblings = function ( elem ) {

	// Variables
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through all sibling nodes
	for ( ; sibling; sibling = sibling.nextSibling ) {
	    if ( sibling.nodeType === 1 && sibling !== elem ) {
		siblings.push( sibling );
	    }
	}

	return siblings;

    };

    /**
     *  wc.publish("wc-maker", {
     *      id: this.id,
     *      user: "Mel",
     *      action: "click"
     *  });
     */
    wc.publish = function(ele, name, values) {
	console.group("wc.publish", ele.id, name, values);

	var event = document.createEvent('CustomEvent');
	
	event.initCustomEvent(name, true, true, values);
	
	ele.dispatchEvent(event);

	console.groupEnd();
    };

    /*
     *  wc.subscribe("wc-maker", function(e) {
     *      console.log(">>>>>>>", e.detail);
     *  });
     */
    wc.subscribe = function(name, callback) {
	console.group("wc.subscribe", name);

	window.addEventListener(name, callback, true);

	console.groupEnd();
    };

    /*
     * equivalend of $().load()
     */
    wc.load = function(element, url, callback=null) {
	console.group("wc.load", element.id, url);

	$.ajax({
	    url: url, 
	    type: 'get',
	    error: function(XMLHttpRequest, textStatus, errorThrown){
		console.error('HOUSTON WE HAVE PROBLEM IN: ' + url);

		if (callback) {
		    callback("ERROR");

		    return new Promise(function (resolve, reject) {
			console.log('running');
			reject(); 
		    });
		}
	    },
	    success: function(data){
		element.innerHTML = data;

		if (callback) {
		    callback("SUCCESS");

		    return new Promise(function (resolve, reject) {
			console.log('running');
			resolve(); 
		    });
		}
	    }
	});

	console.groupEnd();
    }

    /*
     *
     */
    wc.getAttributes = function(node) {
	console.group("wc.getAttributes", node);

	var i, attributeNodes = node.attributes, length = attributeNodes.length, attrs = {};
	
	for ( i = 0; i < length; i++ ) {
	    attrs[attributeNodes[i].name] = attributeNodes[i].value;
	}

	console.groupEnd();
	return attrs;
    }

    /*
     * SAVE STATS IN EACH OBJECT
     */
    wc.setStats = function(obj, cname, version) {
	console.group("wc.setStats:", cname, version);
	
	this.img = document.createElement("img");

	console.log("wcENV:", wcENV, "wcURL:", wcURL, "wcAPP:", wcAPP);

	this.img.src =
	    wcURL + "/assets/ma.gif?" +
	    "app=" +  wcAPP +
	    "&comp=" + cname + "&ver=" + version +
	    "&date=" + escape(new Date()) + 
	    "&browser=" + escape(navigator.userAgent) +
	    "&url=" + location.protocol + "//" + location.host + location.pathname;
	
	this.img.style.display = "none";

	obj.appendChild(this.img)

	console.groupEnd()
    }

    /*
     * $.type(obj);
     *
     * Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
     */
    wc.type = function(obj) {
	console.group("wc.type:", obj);

	console.groupEnd()
	return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    }

    /*
     *    jQuery: $(el).fadeIn();
     *
     *    Native: fadeIn(el);
     */
    wc.fadeIn = function(elem,ms) {
	console.group("wc.fadeIn:", elem,ms);

	if(!elem) return;

	elem.style.opacity = 0;
	elem.style.filter = "alpha(opacity=0)";
	elem.style.display = "inline-block";
	elem.style.visibility = "visible";
	
	if(ms) {
	    var opacity = 0;
	    var timer = setInterval( function() {
		opacity += 50 / ms;
		if( opacity >= 1 ) {
		    clearInterval(timer);
		    opacity = 1;
		}

		elem.style.opacity = opacity;
		elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
	    }, 50 );
	} else {
	    elem.style.opacity = 1;
	    elem.style.filter = "alpha(opacity=1)";
	}

	console.groupEnd()
    }

    /*
     *    jQuery: $(el).fadeOut();
     *
     *    Native: fadeOut(el);
     */
    wc.fadeOut = function(elem,ms) {
	console.group("wc.fadeOut:", elem, ms);

	if(! elem)return;

	if(ms) {
	    var opacity = 1;
	    var timer = setInterval( function() {
		opacity -= 50 / ms;
		if( opacity <= 0 ) {
		    clearInterval(timer);
		    opacity = 0;
		    elem.style.display = "none";
		    elem.style.visibility = "hidden";
		}

		elem.style.opacity = opacity;
		elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
	    }, 50 );
	} else {
	    elem.style.opacity = 0;
	    elem.style.filter = "alpha(opacity=0)";
	    elem.style.display = "none";
	    elem.style.visibility = "hidden";
	}

	console.groupEnd()
    }

    /*
     * $(el).hasClass(className);
     */
    wc.hasClass = function(el,className) {
	console.group("wc.hasClass:", el, className);

	console.groupEnd()
	return new RegExp('(\\s|^)' + className + '(\\s|$)').test(el.className);
    }

    /*
     * $(el).children();
     *
     * el.children
     */
    wc.children = function(el) {
	console.group("wc.children:", el);

	console.groupEnd()
	return el.children;
    }

    /*
     * $(el).clone();
     *
     * el.cloneNode(true);
     */
    wc.clone = function(el) {
	console.group("wc.clone:", el);

	console.groupEnd()
	el.cloneNode(true);
    }

    /*
     * $('<div>').append($(el).clone()).html();
     *
     * el.outerHTML
     */
    wc.append = function(el,html) {
	console.group("wc.append:", el, html);

	el.outerHTML = html;

	console.groupEnd()
    }

    wc.slideDown = function(element, duration, finalheight, callback) {
	console.group("wc.slideDown:", element, duration, finalheight);

	var s = element.style;
	s.height = '0px';

	var y = 0;
	var framerate = 10;
	var one_second = 1000;
	var interval = one_second*duration/framerate;
	var totalframes = one_second*duration/interval;
	var heightincrement = finalheight/totalframes;
	var tween = function () {
            y += heightincrement;
            s.height = y+'px';
            if (y<finalheight) {
		setTimeout(tween,interval);
            }
	}
	tween();

	console.groupEnd()
    }

    //
    // Public APIs
    //
    ////////////////////////////////////////////////////////////////////////////////////
    ////
    ////////////////////////////////////////////////////////////////////////////////////
    wc.notify = function(options) {
        console.group("wc.notify", JSON.stringify(options));
	
        var noty = new Noty(options);
	
        if (options.show) {
            noty.show();
        }
	
        if (options.include) {
            $("#" + options.id + " .noty_body").load(options.include);
        }
	
        if (options.width) {
            $("#" + options.id).parent().width(options.width);
        }
	
        console.groupEnd();
        console.log(noty);
        return noty;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    //// SAMPLE
    ////////////////////////////////////////////////////////////////////////////////////
    wc.infoTest = function() {
        console.group("wc.infoTest");
	
        //visibilityControl: true,
	
        var myNoty = wc.notify({
            id:           "my-notify",
            width:        "500px",
            theme:        "bootstrap-v4",
            type:         "info",
            layout:       "centerRight",
            timeout:      "3000",
            modal:        false,
            killer:       false,
            show:         true,
            text:         "Mel was here...", // WILL BE IGNORE IF HAVE "include"
            include:      "/tk/lib/components/w/html/parts/noty/info.html",
        })
	
        console.groupEnd();
        return myNoty;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    //// SAMPLE
    ////////////////////////////////////////////////////////////////////////////////////
    wc.warningTest = function() {
        console.group("wc.warningTest");
	
        var myNoty = wc.notify({
            id:           "my-notify",
            width:        "500px",
            theme:        "bootstrap-v4",
            type:         "warning",
            layout:       "topRight",
            timeout:      "3000",
            modal:        false,
            killer:       false,
            show:         true,
            text:         "Mel was here...", // WILL BE IGNORE IF HAVE "include"
            include:      "/tk/lib/components/w/html/parts/noty/info.html",
        })
	
        console.groupEnd();
        return myNoty;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    //// SAMPLE
    ////////////////////////////////////////////////////////////////////////////////////
    wc.errorTest = function() {
        console.group("wc.errorTest");
	
        var myNoty = wc.notify({
            id:           "my-notify",
            width:        "500px",
            theme:        "bootstrap-v4",
            type:         "error",
            layout:       "center",
            timeout:      "3000",
            modal:        true,
            killer:       false,
            show:         true,
            text:         "Mel was here...", // WILL BE IGNORE IF HAVE "include"
            include:      "/tk/lib/components/w/html/parts/noty/info.html",
        })
	
        console.groupEnd();
        return myNoty;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    //// SAMPLE
    ////////////////////////////////////////////////////////////////////////////////////
    wc.dialogTest = function() {
        console.group("wc.dialogTest");
        var myNoty = wc.notify({
            id:           "my-notify",
            closeWith:    "button",
            width:        "500px",
            theme:        "bootstrap-v4",
            type:         "default",
            layout:       "center",
            timeout:      "",
            modal:        true,
            killer:       false,
            show:         true,
            text:         "Mel was here...", // WILL BE IGNORE IF HAVE "include"
            include:      "/tk/lib/components/w/html/parts/noty/info.html",
	    
            buttons: [
		Noty.button('I AGREE', 'btn btn-outline-success btn-noty', function () {
                    console.log('btn-ok clicked');
		}),
		Noty.button('I Disagree', 'btn btn-outline-secondary btn-noty', function () {
                    console.log('btn-close clicked');
                    myNoty.close();// CLOSE DIALOG
		})
            ]
        })
	
        console.groupEnd();
        return myNoty;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    //// SAMPLE
    ////////////////////////////////////////////////////////////////////////////////////
    wc.workingTest = function() {
        console.group("wc.workingTest");
	
        var myNoty = wc.notify({
            id:           "my-notify",
            closeWith:    "button",
            width:        "500px",
            theme:        "bootstrap-v4",
            type:         "transparent",
            layout:       "center",
            timeout:      "4000",
            modal:        true,
            killer:       false,
            show:         true,
            text:         "<div style=text-align:center><img src='/tk/img/common/loading.3.gif'/></div>"
        })
	
        console.groupEnd();
        return myNoty;
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////
    //// wc.waitFor(function() {
    ////    return $(".navbar").length
    //// }, function() {
    ////    alert("A");
    //// });
    ////
    ////////////////////////////////////////////////////////////////////////////////////
    wc.waitFor = function(condition, callback) {
	if(!condition()) {
            console.log('waiting');
            window.setTimeout(waitFor.bind(null, condition, callback), 300); /* this checks the flag every 300 milliseconds*/
	} else {
            console.log('done');
            callback();
	}
    }

    ////////////////////////////////////////////////////////////////////////////////////
    //// sleep(2000)
    ////////////////////////////////////////////////////////////////////////////////////
    wc.sleep = function(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
		break;
	    }
	}
    }	 

    ////////////////////////////////////////////////////////////////////////////////////
    //// EXECUTE A PIECE OF CODE SO MANY TIMES
    ////
    //// wc.interval(function(){
    ////     console.log("waiting...")
    //// }, 1000, 10);
    ///     timeout, how many times to try
    ////////////////////////////////////////////////////////////////////////////////////
    wc.interval = function(func, wait, times){
	var interv = function(w, t){
            return function(){
		if(typeof t === "undefined" || t-- > 0){
                    setTimeout(interv, w);

                    try{
			func.call(null);
                    }
                    catch(e){
			t = 0;
			throw e.toString();
                    }
		}
            };
	}(wait, times);

	setTimeout(interv, wait);
    };

    ////////////////////////////////////////////////////////////////////////////////////
    //// NEED  <script src="/GitHub/whendefined/dist/whendefined.js"></script>
    ////////////////////////////////////////////////////////////////////////////////////
    // whenDefined(window, 'fname', function() {
    // 	console.log('>>>>loaded:', fname);
    // });
    //
    // setTimeout(function(){
    // 	fname = "Mel"
    // }, 2000);

    return wc;
});
