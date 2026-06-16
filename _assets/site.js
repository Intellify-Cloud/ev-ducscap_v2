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

        var scrollableHeight = $(document).height() - $(window).height();
        var hasScrolledSixtyPercent = scrollableHeight > 0 && scrollTop / scrollableHeight > 0.6;
        hasScrolledSixtyPercent ? $(".back-to-top-pill").addClass("is-visible") : $(".back-to-top-pill").removeClass("is-visible");
    });

    var testimonialsTrack = document.getElementById("testimonialsHelloTrack");
    var testimonialsPrev = document.getElementById("testimonialsHelloPrev");
    var testimonialsNext = document.getElementById("testimonialsHelloNext");

    if (testimonialsTrack && testimonialsPrev && testimonialsNext) {
        var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        var getTestimonialScrollAmount = function () {
            var firstCard = testimonialsTrack.querySelector(".testimonials-hello-card");
            if (!firstCard) return 0;
            var trackStyles = window.getComputedStyle(testimonialsTrack);
            var gap = parseInt(trackStyles.gap, 10) || 0;
            return firstCard.offsetWidth + gap;
        };

        var updateTestimonialButtons = function () {
            testimonialsPrev.disabled = testimonialsTrack.scrollLeft <= 0;
            testimonialsNext.disabled = testimonialsTrack.scrollLeft + testimonialsTrack.offsetWidth >= testimonialsTrack.scrollWidth - 1;
        };

        testimonialsNext.addEventListener("click", function () {
            testimonialsTrack.scrollBy({
                left: getTestimonialScrollAmount(),
                behavior: prefersReducedMotion.matches ? "auto" : "smooth"
            });
        });

        testimonialsPrev.addEventListener("click", function () {
            testimonialsTrack.scrollBy({
                left: -getTestimonialScrollAmount(),
                behavior: prefersReducedMotion.matches ? "auto" : "smooth"
            });
        });

        testimonialsTrack.addEventListener("scroll", updateTestimonialButtons, { passive: true });
        window.addEventListener("resize", updateTestimonialButtons);
        updateTestimonialButtons();
    }
});

