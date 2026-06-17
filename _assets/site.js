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
        var testimonialsDesktop = window.matchMedia("(min-width: 1024px)");
        var testimonialCards = Array.prototype.slice.call(testimonialsTrack.querySelectorAll(".testimonials-hello-card"));
        var testimonialActiveIndex = 0;

        var testimonialMod = function (number, divisor) {
            return ((number % divisor) + divisor) % divisor;
        };

        var getTestimonialScrollAmount = function () {
            var firstCard = testimonialCards[0];
            if (!firstCard) return 0;
            var trackStyles = window.getComputedStyle(testimonialsTrack);
            var gap = parseInt(trackStyles.gap, 10) || 0;
            return firstCard.offsetWidth + gap;
        };

        var getTestimonialPositions = function () {
            var trackStyles = window.getComputedStyle(testimonialsTrack);
            var peekWidth = parseFloat(trackStyles.getPropertyValue("--testimonials-card-peek")) || 0;
            var gap = parseFloat(trackStyles.getPropertyValue("--testimonials-track-gap")) || 24;
            var cardWidth = testimonialCards[0] ? testimonialCards[0].offsetWidth : 0;

            return {
                peekLeft: -(cardWidth - peekWidth),
                leftSlot: peekWidth + gap,
                rightSlot: peekWidth + gap + cardWidth + gap,
                peekRight: peekWidth + gap + cardWidth + gap + cardWidth + gap
            };
        };

        var renderDesktopTestimonials = function () {
            if (!testimonialCards.length) return;

            var positions = getTestimonialPositions();
            var total = testimonialCards.length;
            var visibleCards = [
                { index: testimonialMod(testimonialActiveIndex - 1, total), x: positions.peekLeft },
                { index: testimonialMod(testimonialActiveIndex, total), x: positions.leftSlot },
                { index: testimonialMod(testimonialActiveIndex + 1, total), x: positions.rightSlot },
                { index: testimonialMod(testimonialActiveIndex + 2, total), x: positions.peekRight }
            ];

            testimonialCards.forEach(function (card) {
                card.style.transform = "translateX(-9999px)";
                card.setAttribute("aria-hidden", "true");
            });

            visibleCards.forEach(function (item) {
                var card = testimonialCards[item.index];
                card.style.transform = "translateX(" + item.x + "px)";
                card.removeAttribute("aria-hidden");
            });

            testimonialsPrev.disabled = false;
            testimonialsNext.disabled = false;
        };

        var resetMobileTestimonials = function () {
            testimonialCards.forEach(function (card) {
                card.style.transform = "";
                card.removeAttribute("aria-hidden");
            });
        };

        var updateTestimonialButtons = function () {
            if (testimonialsDesktop.matches) {
                renderDesktopTestimonials();
                return;
            }

            testimonialsPrev.disabled = testimonialsTrack.scrollLeft <= 0;
            testimonialsNext.disabled = testimonialsTrack.scrollLeft + testimonialsTrack.offsetWidth >= testimonialsTrack.scrollWidth - 1;
        };

        testimonialsNext.addEventListener("click", function () {
            if (testimonialsDesktop.matches) {
                testimonialActiveIndex = testimonialMod(testimonialActiveIndex + 1, testimonialCards.length);
                renderDesktopTestimonials();
                return;
            }

            testimonialsTrack.scrollBy({
                left: getTestimonialScrollAmount(),
                behavior: prefersReducedMotion.matches ? "auto" : "smooth"
            });
        });

        testimonialsPrev.addEventListener("click", function () {
            if (testimonialsDesktop.matches) {
                testimonialActiveIndex = testimonialMod(testimonialActiveIndex - 1, testimonialCards.length);
                renderDesktopTestimonials();
                return;
            }

            testimonialsTrack.scrollBy({
                left: -getTestimonialScrollAmount(),
                behavior: prefersReducedMotion.matches ? "auto" : "smooth"
            });
        });

        testimonialsTrack.addEventListener("scroll", updateTestimonialButtons, { passive: true });
        window.addEventListener("resize", function () {
            if (testimonialsDesktop.matches) {
                renderDesktopTestimonials();
            } else {
                resetMobileTestimonials();
                updateTestimonialButtons();
            }
        });

        if (testimonialsDesktop.matches) {
            renderDesktopTestimonials();
        } else {
            resetMobileTestimonials();
            updateTestimonialButtons();
        }
    }
});

