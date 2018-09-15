//////////////////////////////////////////////////////////////////////////////
////
//////////////////////////////////////////////////////////////////////////////
var winSize = '';

//////////////////////////////////////////////////////////////////////////////
////
//////////////////////////////////////////////////////////////////////////////
window.onresize = function () {
    if ($(this).width() >= 1200) {
        newWinSize = 'lg';
    } else if ($(this).width() >= 992) {
        newWinSize = 'md';
    } else if ($(this).width() >= 768) {
        newWinSize = 'sm';
    } else {
        newWinSize = 'xs';
    }

    if( newWinSize != winSize ) {
        winSize = newWinSize;
	console.log("MEDIA CHANGED to: " + winSize);

	jQuery.publish('mediaChange', ['normal', winSize]); // PUBLISH
    }
};
