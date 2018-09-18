/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-09-17 20:49:00 (melify)>
/////////////////////////////////////////////////////////////////////////////////
var mtkBtns = {};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
mtkBtns.init = function(options) {
    console.group("mtkBtns.init");

    $(".mtk-btn-action").on("click", function() {
	let id = $(this).attr("id");
	let name = document.title.toLowerCase().split(" ")[0];
	
	switch(id) 
	{
	    case "mtk-btn-1":
	    document.location.href = "/mtk/render?page=components";
	    break;

	    case "mtk-btn-2":
	    document.location.href = "/mtk/render?callback=tk::viewsource&file=/Melify/mtk/dev/tk/lib/components/w/html/" + name + ".html";
	    break;

	    case "mtk-btn-3":
	    document.location.href = "/mtk/render?callback=tk::viewsource&file=/Melify/mtk/dev/tk/lib/components/w/js/" + name + ".js";
	    break;

	    case "mtk-btn-4":
	    document.location.href = "/mtk/render?callback=tk::viewsource&file=/Melify/mtk/dev/tk/lib/components/w/scss/_" + name + ".scss";
	    break;
	}
    });

    console.groupEnd();
};

jQuery(document).ready(function() {
    setTimeout(function(){
	mtkBtns.init();
    }, 1000);
});
