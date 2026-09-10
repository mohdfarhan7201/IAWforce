
$(document).ready(function () {


 AOS.init();
    /*__ mobile hamburger menu __*/
    $('#changeToggle').on('click', function (event) {
        $('#navbar-hamburger').toggleClass('open');
    });


    $('.navbar-collapse').on('click', function (event) {
        $(this).removeClass('show');
        $('#navbar-hamburger').removeClass('open');
        event.stopPropagation();
    });


   


    // $('.page-header .btn-notify').click(function () {
    //     $('html, body').animate({
    //         scrollTop: $($(this).attr('href')).offset().top
    //     }, 500);
    //     return false;
    // });

    /*_ Tabs in desktop to Dropdown in mobile_*/
    (function ($) {
        $('.section-key-features .nav-tabs').responsiveTabs();
        $('.section-gallery .nav-tabs').responsiveTabs();
        $('.section-wheelbase .nav-tabs').responsiveTabs();

    })(jQuery);


    /*_ Banner section Carousel _*/

    // $('#secton-banner-carousel .owl-carousel').owlCarousel({
    //     items: 1,
    //     responsiveClass: true,
    //     dots: true,
    //     nav: true,
    //     navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'>"],

    // })

    /*_ Video Fancybox Popup_*/

    $('[data-fancybox]').fancybox({
        youtube: {
            controls: 0,
            showinfo: 0,
            autoplay: 0,
        }/*,
        beforeShow: function () {
            $("body").css({
                "overflow-y": "hidden",
                "position": "fixed"
            }
            );
        },
        afterClose: function () {
            $("body").removeAttr("style");
        }*/
    });

  

    /*_ Key Features Carousel _*/
    $('#featuresTabContent .owl-carousel').owlCarousel({
        items: 1,
        loop: false,
        responsiveClass: true,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'>"],
    })

    /*_ Wheelbase Carousel_*/
    $('#wheelbase-slider .owl-carousel').owlCarousel({
        items: 1,
        loop: false,
        center: true,
        nav: true,
        dots: false,
        margin: 10,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'>"],

    });


 


    /*_ Gallery Carousel _*/
    /*_ Gallery Carousel _*/
    $('.slick-carousel').slick({
        rows: 2,
        slidesPerRow: 3,
        dots: false,
        arrows: true,
        infinite: false,
        margin: 10,
        speed: 300,
        prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-arrow-left"></i>PREV</button>',
        nextArrow: '<button class="slick-next slick-arrow">NEXT<i class="fa fa-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesPerRow: 2,
                    rows: 2,
                    prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-arrow-left"></i>PREV</button>',
                    nextArrow: '<button class="slick-next slick-arrow">NEXT<i class="fa fa-arrow-right"></i></button>',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesPerRow: 2,
                    rows: 2,
                    prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-arrow-left"></i>PREV</button>',
                    nextArrow: '<button class="slick-next slick-arrow">NEXT<i class="fa fa-arrow-right"></i></button>',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesPerRow: 1,
                    rows: 1,
                    prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></button>',
                    nextArrow: '<button class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></button>',
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesPerRow: 1,
                    rows: 1,
                    prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></button>',
                    nextArrow: '<button class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></button>',
                }
            }

        ]
    });


    $(".img-mobile img").mouseover(function () {
        console.log("Mouseover");
        console.log($(this).attr('src'));
        $(this).attr('src', $(this).data("hover"));
        $(this).animate({
            height: "100%",
            transition: "1s all"
        });
    }).mouseout(function () {
        console.log("Mouseout");
        $(this).attr('src', $(this).data("src"));
        $(this).animate({
            height: "100%",
            // transition: "0.5s all"

        });
    });

    

});
//document ends

