$(function () {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = $(this.hash);
            if ((a = a.length ? a : $("[name=" + this.hash.slice(1) + "]")).length) return $("html, body").animate({
                scrollTop: a.offset().top - 54
            }, 1e3, "easeInOutExpo"), !1
        }
    });

    $(".js-scroll-trigger").on("click", function () {
        $(".navbar-collapse").collapse("hide")
    });

    $("body").scrollspy({
        target: "#mainNav",
        offset: 56
    });

    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        100 < scrollTop ? $("#mainNav").addClass("navbar-shrink") : $("#mainNav").removeClass("navbar-shrink");
        500 < scrollTop ? $(".back-to-top-pill").addClass("is-visible") : $(".back-to-top-pill").removeClass("is-visible");
    });
});

