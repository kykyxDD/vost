$(document).ready(function() {

    const el_slider_photo = '.slider-teams-photo';
    const el_slick_current = '.slick-active.slick-current'
    const cl_prev = 'prev';
    const cl_next = 'next';
    const cl_beforePrev = 'beforePrev';
    const cl_afterNext = 'afterNext';
    const cl_slick_slide = '.slick-slide';

    function slickBeforeChange(event, slick, currentSlide,  nextSlide) {
        console.log(event, slick, currentSlide,  nextSlide)
        if(currentSlide == nextSlide) return false
        $(el_slider_photo).find(cl_slick_slide).removeClass(`${cl_prev} ${cl_next} ${cl_beforePrev} ${cl_afterNext}`);
        
        const nextPanel = $(el_slider_photo).find('[data-slick-index=' + nextSlide + ']');

        if(nextPanel.length){
            slickAfterChange(nextPanel[0])
        }
        console.log('nextPanel', nextPanel)
    }

    function slickAfterChange(elem) {
        console.log('slickAfterChange', elem)
        if(!elem) {
            elem = $(el_slider_photo).find(el_slick_current)
            console.log('elem', elem)
        }
        $(elem).prev().addClass(cl_prev).prev().addClass(cl_beforePrev);
        $(elem).next().addClass(cl_next).next().addClass(cl_afterNext);
    }

    $(el_slider_photo).on('init', slickAfterChange.bind(this, false)
    ).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        //fade: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        centerMode: true,
        variableWidth: true,
        asNavFor: '.slider-teams-info'
    }).on('beforeChange', slickBeforeChange.bind(this)
    ).on('afterChange', slickAfterChange.bind(this));


  $('.slider-teams-info').slick({
    //dots: true,
    infinite: true,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-teams-photo',
    // appendArrows: $(this).parents('.slider').find('.button-container'),
    prevArrow: '<div id="prev" class="btn-prev"><img src="assets/svg-back.png"/></div>',
    nextArrow: '<div id="next" class="btn-next"><img src="assets/svg-next.png"/></div>'
  });

  $('[data-toggle="popover"]').popover()
});
