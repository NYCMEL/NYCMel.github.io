function swipeme() {
    let swipe = document.querySelector("wc-swipe");
    let swiper = swipe.swiper;
	
    $(".hamberger").unbind("click").on("click", function() {
	swipe.slideTo(0);
    });

    $(".pager").unbind("click").on("click", function() {
	let ind = $(this).attr("ind");
	
	swipe.slideTo(ind);
    });

    $(".addone").unbind("click").on("click", function() {
	let next = $(".swiper-slide").length; next++;

	swiper.appendSlide("<div class='swiper-slide'><div id='swiper-" + next + "' class='a-swiper'></div></div>");

	$(".swiper-slide:nth-child(" + next + ")").load("/mtk/render?ajax=1&callback=swiper::more", () => {
	    swipe.slideTo(next);

	    swipeme();
	});

	var d = new Date();
	var n = d.getTime();

	$("li.addone").parent().append("<li class='pager' ind='" + next + "'>Added - " + n + "</li>");
    });
}

jQuery(document).ready(function() {
    swipeme();
});

