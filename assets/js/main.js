$(document).ready(function () {

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    })
    wow.init();


    $(".mask-phone").mask("+ 7 (A00) 000 - 00 - 00", {
        clearIfNotMatch: true,
        'translation': {A: {pattern: /[1,2,3,4,5,6,9]/}, 0: {pattern: /[0-9]/}}
    });

    // Product Gallery Swiper
    if (document.querySelector('.product-gallery__thumbs') && document.querySelector('.product-gallery__main')) {
        const thumbsSwiper = new Swiper('.product-gallery__thumbs', {
            spaceBetween: 12,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            direction: 'vertical',
        });

        const mainSwiper = new Swiper('.product-gallery__main', {
            spaceBetween: 0,
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    }

});